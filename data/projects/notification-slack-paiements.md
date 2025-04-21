---
title: Notification Slack des paiements via webhooks
desc: Centralisation des notifications de paiement de multiples services dans un canal Slack via un serveur Flask.
miniature: img/stripe-fintecture.png
icon: fas fa-bell
type: auto
github: https://github.com/Laseguue/Vide.git
demo: "#"
details:
  context: Une entreprise utilise plusieurs services de paiement (Stripe, PayPal) et souhaite centraliser les notifications dans un canal Slack pour un suivi en temps réel.
  problematique: Les services envoient des notifications via webhooks, mais il n’existe pas de système centralisé pour les regrouper dans Slack. Une solution est nécessaire pour collecter, traiter et formater ces notifications.
  solution: Développement d’un serveur Flask en Python sur Google Cloud Functions, agissant comme point d’entrée pour les webhooks. Le script traite les données et envoie des notifications formatées via l’API Slack.
  gain:
    - Centralisation des notifications dans un canal Slack unique.
    - Réactivité accrue grâce à des alertes en temps réel.
    - Solution légère et scalable pour plusieurs services.
  technologies:
    - Python
    - Flask
    - Google Cloud Functions
    - Slack API
    - Stripe API
    - PayPal API
---