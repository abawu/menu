# Rome 1960 Digital Menu

Mobile-first QR menu for Rome 1960 Specialty Kitchen & Cafe.

## Run locally

```powershell
python -m http.server 4173
```

Open `http://localhost:4173`.

The menu is a lightweight static app with no build step. It includes search, category navigation, dietary filters, dish detail cards, a persistent table-side order preview, share action, and a service worker for repeat visits. Prices and dishes are sourced from the official menu PDF supplied with the project; items marked “Market price” are listed without a numeric price in that source.
