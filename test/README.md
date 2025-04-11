# Tests du projet Vue Demo

Ce dossier contient les tests unitaires pour les services et les composants du projet.

## Prérequis

Pour exécuter les tests, vous devez d'abord installer les dépendances nécessaires :

```bash
npm install -D vitest @testing-library/vue @vue/test-utils jsdom @pinia/testing
```

## Ajout de la configuration Vitest

Ajoutez la configuration suivante à votre fichier `vite.config.ts` :

```typescript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/scss/_variables.scss";
        `,
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    deps: {
      inline: ["vue", "@vue/test-utils"],
    },
  },
});
```

## Ajout des scripts de test

Ajoutez les scripts suivants à votre fichier `package.json` :

```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest"
}
```

## Structure des tests

- `services/` : Tests des services API

  - `movie.service.test.ts` : Tests pour les fonctions du service de film avec Axios
  - `movie.servicfetch.test.ts` : Tests pour les fonctions du service de film avec Fetch

- `pages/` : Tests des composants de page
  - `ListMovies.test.ts` : Tests pour la liste des films
  - `CreateMovie.test.ts` : Tests pour la création d'un film
  - `DisplayMovie.test.ts` : Tests pour l'affichage d'un film
  - `PlanetList.test.ts` : Tests pour la liste des planètes
  - `PlanetListComposable.test.ts` : Tests pour la liste des planètes utilisant un composable

## Exécution des tests

Pour exécuter tous les tests une seule fois :

```bash
npm test
```

Pour exécuter les tests en mode watch (mise à jour automatique) :

```bash
npm run test:watch
```

Pour exécuter un fichier de test spécifique :

```bash
npm test -- test/services/movie.service.test.ts
```
