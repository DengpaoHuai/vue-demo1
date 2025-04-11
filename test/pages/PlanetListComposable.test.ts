import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import PlanetListComposable from "../../src/pages/PlanetListComposable.vue";

// Mock du composable
vi.mock("../../src/composables/usePlanets", () => ({
  usePlanets: vi.fn(() => ({
    planets: vi.ref([
      { name: "Tatooine", climate: "arid", terrain: "desert" },
      {
        name: "Alderaan",
        climate: "temperate",
        terrain: "grasslands, mountains",
      },
    ]),
    loading: vi.ref(false),
    error: vi.ref(""),
    fetchPlanets: vi.fn(),
  })),
}));

describe("PlanetListComposable", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("devrait afficher la liste des planètes", async () => {
    const wrapper = mount(PlanetListComposable);

    // Vérifie que le titre est affiché
    expect(wrapper.find("h1").text()).toBe("Planet List Composable");

    // Vérifie que les planètes sont affichées
    const planetItems = wrapper.findAll("li");
    expect(planetItems.length).toBe(2);

    // Vérifie le contenu des planètes
    expect(planetItems[0].text()).toContain("Tatooine");
    expect(planetItems[0].text()).toContain("arid");
    expect(planetItems[0].text()).toContain("desert");

    expect(planetItems[1].text()).toContain("Alderaan");
    expect(planetItems[1].text()).toContain("temperate");
    expect(planetItems[1].text()).toContain("grasslands, mountains");
  });

  it("devrait appeler fetchPlanets lors du montage", async () => {
    // Crée un mock pour le composable usePlanets
    const fetchPlanetsMock = vi.fn();
    vi.mocked(usePlanets).mockImplementation(() => ({
      planets: vi.ref([]),
      loading: vi.ref(false),
      error: vi.ref(""),
      fetchPlanets: fetchPlanetsMock,
    }));

    const wrapper = mount(PlanetListComposable);

    // Vérifie que fetchPlanets a été appelé
    expect(fetchPlanetsMock).toHaveBeenCalled();
  });

  it("devrait afficher un message de chargement", async () => {
    // Mock de l'état de chargement
    vi.mocked(usePlanets).mockImplementation(() => ({
      planets: vi.ref([]),
      loading: vi.ref(true),
      error: vi.ref(""),
      fetchPlanets: vi.fn(),
    }));

    const wrapper = mount(PlanetListComposable);

    // Vérifie que le message de chargement est affiché
    expect(wrapper.text()).toContain("Chargement...");
  });

  it("devrait afficher un message d'erreur", async () => {
    // Mock d'une erreur
    vi.mocked(usePlanets).mockImplementation(() => ({
      planets: vi.ref([]),
      loading: vi.ref(false),
      error: vi.ref("Erreur de chargement"),
      fetchPlanets: vi.fn(),
    }));

    const wrapper = mount(PlanetListComposable);

    // Vérifie que le message d'erreur est affiché
    expect(wrapper.text()).toContain("Erreur de chargement");
  });
});
