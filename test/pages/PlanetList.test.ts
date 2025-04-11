import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import PlanetList from "../../src/pages/PlanetList.vue";

// Mock du module fetch
vi.mock("node-fetch", () => ({
  default: vi.fn(),
}));

describe("PlanetList", () => {
  const mockPlanets = {
    results: [
      {
        name: "Tatooine",
        climate: "arid",
        terrain: "desert",
        population: "200000",
      },
      {
        name: "Alderaan",
        climate: "temperate",
        terrain: "grasslands, mountains",
        population: "2000000000",
      },
    ],
  };

  beforeEach(() => {
    vi.resetAllMocks();

    // Mock fetch global
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockPlanets),
    });
  });

  it("devrait afficher la liste des planètes après le chargement", async () => {
    const wrapper = mount(PlanetList);

    // Attendre que les promesses soient résolues
    await flushPromises();

    // Vérifie que le titre est affiché
    expect(wrapper.find("h1").text()).toBe("Planet List");

    // Vérifie que fetch a été appelé avec la bonne URL
    expect(global.fetch).toHaveBeenCalledWith("https://swapi.dev/api/planets");

    // Vérifie que les planètes sont affichées
    const planetItems = wrapper.findAll("li");
    expect(planetItems.length).toBe(mockPlanets.results.length);

    // Vérifie le contenu des planètes
    expect(planetItems[0].text()).toContain("Tatooine");
    expect(planetItems[0].text()).toContain("arid");
    expect(planetItems[0].text()).toContain("desert");

    expect(planetItems[1].text()).toContain("Alderaan");
    expect(planetItems[1].text()).toContain("temperate");
    expect(planetItems[1].text()).toContain("grasslands, mountains");
  });

  it("devrait afficher un message d'erreur si le chargement échoue", async () => {
    // Mock une erreur
    global.fetch = vi.fn().mockRejectedValue(new Error("Erreur réseau"));

    const wrapper = mount(PlanetList);

    // Attendre que les promesses soient rejetées
    await flushPromises();

    // Vérifie que le message d'erreur est affiché
    expect(wrapper.text()).toContain("Erreur lors du chargement des planètes");
  });

  it("devrait filtrer les planètes en fonction du texte de recherche", async () => {
    const wrapper = mount(PlanetList);

    // Attendre que les promesses soient résolues
    await flushPromises();

    // Entrer du texte dans la recherche
    const searchInput = wrapper.find('input[type="text"]');
    await searchInput.setValue("Tatooine");

    // Vérifier que seule la planète correspondante est affichée
    const planetItems = wrapper.findAll("li");
    expect(planetItems.length).toBe(1);
    expect(planetItems[0].text()).toContain("Tatooine");
    expect(planetItems[0].text()).not.toContain("Alderaan");
  });
});
