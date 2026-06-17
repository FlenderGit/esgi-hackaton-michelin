import { initializeApp } from "firebase/app";
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  QuerySnapshot,
} from "firebase/firestore";
import { err, ok, Result, ResultAsync } from "neverthrow";
import { z } from "zod";
import { env } from "./env";

const firebaseConfig = {
  apiKey: env.FIRESTORE_API_KEY,
  authDomain: "esgi-hackaton-michelin.firebaseapp.com",
  projectId: "esgi-hackaton-michelin",
  storageBucket: "esgi-hackaton-michelin.firebasestorage.app",
  messagingSenderId: "915330284663",
  appId: "1:915330284663:web:03ac7a24d139df4b21da72",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SUPPLIER_COLLECTION_NAME = "suppliers";

export const geopoint_schema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const supplier_schema = z.object({
  id: z.string().regex(/^F\d{3}$/),
  name: z.string().min(1),
  city: z.string().min(1),
  address: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  phone: z.string().optional(),
  position: geopoint_schema,
  speciality: z.string().min(1),
  active: z.boolean(),
  createdAt: z.date().optional(),
});

export type Supplier = z.infer<typeof supplier_schema>;

function zod_parser<T>(schema: z.ZodType<T>, data: unknown): Result<T, string> {
  const result = schema.safeParse(data);
  if (!result.success) {
    return err(
      result.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join(", "),
    );
  }
  return ok(result.data);
}

function map_docs_to_raw(
  querySnapshot: QuerySnapshot<DocumentData>,
): unknown[] {
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export function get_suppliers(): ResultAsync<Array<Supplier>, string> {
  return ResultAsync.fromPromise(
    getDocs(collection(db, SUPPLIER_COLLECTION_NAME)),
    (error) => `Firestore error: ${String(error)}`,
  )
    .map(map_docs_to_raw)
    .andThen((data) => zod_parser(z.array(supplier_schema), data));
}

// Tires
const bead_type_enum = z.enum(["Souple", "Rigide"]);
const mount_type_enum = z.enum([
  "Tubetype",
  "Tubeless Ready",
  "Tubetype / Tubeless Ready",
]);
const category_enum = z.enum(["Route", "VTT", "Ville"]);

const tire_schema = z.object({
  Name: z.string(),
  Category: category_enum,
  Diameter: z.string(),
  Width_mm: z.number().nullable(),
  Width_in: z.number().nullable(),
  ETRTO: z.string().regex(/^\d+-\d+$/),
  TPI: z.number().int().positive(),
  Weight_g: z.number().int().positive(),
  Min_pressure_bar: z.number().positive(),
  Max_pressure_bar: z.number().positive(),
  Bead_type: bead_type_enum,
  Mount_type: mount_type_enum,
  Compound: z.string(),
  Casing: z.string(),
  Usage: z.string(),
  E_Bike_ready: z.enum(["Oui", "Non"]),
  Technology: z.string(),
});

export type Tire = z.infer<typeof tire_schema>;

const TIRES_COLLECTION_NAME = "tires";
export function get_tires(): ResultAsync<Array<Tire>, string> {
  return ResultAsync.fromPromise(
    getDocs(collection(db, TIRES_COLLECTION_NAME)),
    (error) => `Firestore error: ${String(error)}`,
  )
    .map(map_docs_to_raw)
    .andThen((data) => zod_parser(z.array(tire_schema), data));
}
