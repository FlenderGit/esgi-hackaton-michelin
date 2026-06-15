<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="readme-top"></a>
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![project_license][license-shield]][license-url]

<br />
<div align="center">
  <a href="https://github.com/FlenderGit/esgi-hackaton-michelin">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">ESGI Hackathon Michelin Velo</h3>

  <p align="center">
    Revitalizing and boosting Michelin Velo bike sales through a modern commercial platform
    <br />
    <a href="https://github.com/FlenderGit/esgi-hackaton-michelin"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/FlenderGit/esgi-hackaton-michelin">View Demo</a>
    &middot;
    <a href="https://github.com/FlenderGit/esgi-hackaton-michelin/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/FlenderGit/esgi-hackaton-michelin/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>


## About The Project

[![Product Screen Shot][product-screenshot]](https://example.com)

This project was developed during the **ESGI Hackathon** with the goal of **dynamizing and relaunching Michelin Velo** — a commercial platform designed to enhance bike sales and re-engage customers with the Michelin Velo brand.

Bacon ipsum dolor amet drumstick short ribs kevin shankle, flank cow spare ribs frankfurter tongue jerky strip steak. Cow picanha capicola drumstick meatloaf sausage beef ribs ball tip pork chop tenderloin pig. Prosciutto mortadella venison corned beef, pancetta chicken rump leberkas short ribs jowl meatball frankfurter landjaeger. Brisket landjaeger alcatra, prosciutto ball tip frankfurter filet mignon ground round tail chislic ham hock ribeye spare ribs turducken.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

The platform serves as a commercial website to showcase and sell Michelin Velo bikes. Customers can browse the catalog, view product details, and engage with the brand through an optimized user experience.

Key features:
- **Product Catalog** — Browse and filter Michelin Velo bike models
- **Real-time Updates** — Live inventory and availability powered by Firebase
- **Responsive Design** — Optimized for desktop and mobile devices
- **Edge Performance** — Deployed on Cloudflare Pages for global low-latency access

_For more examples and detailed API documentation, please refer to the [Documentation](https://example.com)_


## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js & npm
  ```sh
  npm install npm@latest -g
  ```

* Docker (optional, for production image generation)
  ```sh
  # Ensure Docker is installed on your machine
  docker --version
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/FlenderGit/esgi-hackaton-michelin.git
   ```
2. Install NPM packages
   ```sh
   cd esgi-hackaton-michelin
   npm install
   ```
3. Configure Firebase
   - Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
   - Add your Firebase configuration to the environment variables
   ```sh
   cp .env.example .env.local
   # Edit .env.local with your Firebase credentials
   ```
4. Run the development server
   ```sh
   npm run dev
   ```
5. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Deployment

### Cloudflare Pages (Production)
The application is automatically deployed to Cloudflare Pages via GitHub Actions:
- Push to `main` branch triggers production deployment
- Pull requests generate preview deployments

### Docker Production Images
Minified production Docker images are automatically generated for containerized deployments on new github tag version.
You can find them: in https://github.com/FlenderGit?tab=packages&repo_name=esgi-hackaton-michelin

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Top contributors:

<a href="https://github.com/FlenderGit/esgi-hackaton-michelin/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=FlenderGit/esgi-hackaton-michelin" alt="contrib.rocks image" />
</a>


## License

Distributed under the project_license. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Acknowledgments

* [ESGI](https://www.esgi.fr/) — For organizing the hackathon

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/FlenderGit/esgi-hackaton-michelin.svg?style=for-the-badge
[contributors-url]: https://github.com/FlenderGit/esgi-hackaton-michelin/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/FlenderGit/esgi-hackaton-michelin.svg?style=for-the-badge
[forks-url]: https://github.com/FlenderGit/esgi-hackaton-michelin/network/members
[stars-shield]: https://img.shields.io/github/stars/FlenderGit/esgi-hackaton-michelin.svg?style=for-the-badge
[stars-url]: https://github.com/FlenderGit/esgi-hackaton-michelin/stargazers
[issues-shield]: https://img.shields.io/github/issues/FlenderGit/esgi-hackaton-michelin.svg?style=for-the-badge
[issues-url]: https://github.com/FlenderGit/esgi-hackaton-michelin/issues
[license-shield]: https://img.shields.io/github/license/FlenderGit/esgi-hackaton-michelin.svg?style=for-the-badge
[license-url]: https://github.com/FlenderGit/esgi-hackaton-michelin/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.jpg
