---
title: Génération et suivi d’étiquettes UPS via Airtable
desc: Automatisation de la création d’étiquettes UPS et du suivi des colis à partir des commandes dans Airtable.
miniature: img/ups.png
icon: fas fa-shipping-fast
type: auto
github: https://github.com/Laseguue/Vide.git
demo: "#"
details:
  context: Une entreprise gère ses commandes via Airtable connecté à un front web. Elle a besoin de générer automatiquement des étiquettes UPS et de suivre les livraisons.
  problematique: La création manuelle d’étiquettes et le suivi des colis sont chronophages. Une automatisation est nécessaire pour générer les étiquettes et mettre à jour les statuts.
  solution: Développement de deux scripts Python sur Google Cloud Functions, un script déclenché par Airtable pour générer une étiquette UPS, et un script planifié pour mettre à jour les statuts de suivi dans Airtable.
  gain:
    - Automatisation complète, réduisant les tâches manuelles.
    - Mise à jour en temps réel des statuts dans Airtable.
    - Amélioration de l’expérience client avec un suivi précis.
  technologies:
    - Python
    - Google Cloud Functions
    - Airtable API
    - UPS API
    - Google Cloud Storage
---