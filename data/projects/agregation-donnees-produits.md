---
title: Agrégation et standardisation des données produits
desc: Collecte, standardisation et enrichissement des données produits de multiples fournisseurs pour un catalogue centralisé dans Airtable.
miniature: img/gsheet-airtable.png
icon: fas fa-database
type: auto
github: https://github.com/Laseguue/Vide.git
demo: "#"
details:
  context: Une entreprise utilise Airtable comme base de données centrale pour gérer son catalogue de produits provenant de plusieurs fournisseurs. Les données doivent être collectées, standardisées et enrichies pour être exploitables dans Airtable et affichées sur un front.
  problematique: Les fournisseurs fournissent leurs données via des méthodes hétérogènes (API, téléchargement, scraping). Les formats varient, nécessitant une standardisation. Les images produits doivent être scrapées et stockées, et des informations analytiques extraites.
  solution: Développement d’un programme Python sur Google Cloud Functions pour collecter les données (API, téléchargement, scraping), standardiser les formats, scraper et stocker les images sur Google Cloud Storage, et envoyer les données enrichies à Airtable.
  gain:
    - Centralisation et homogénéisation des données produits.
    - Automatisation réduisant les erreurs et le temps de gestion.
    - Catalogue enrichi avec images, améliorant l’expérience utilisateur.
    - Extraction d’informations pour analyses internes.
  technologies:
    - Python
    - Google Cloud Functions
    - Google Cloud Storage
    - Airtable API
    - BeautifulSoup
    - Selenium
---