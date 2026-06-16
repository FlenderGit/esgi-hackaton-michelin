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
