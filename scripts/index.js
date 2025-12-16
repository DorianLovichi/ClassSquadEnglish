const players = Array.isArray(globalThis.PLAYERS) ? globalThis.PLAYERS : [];

const TEAM_META = {
  "full-stack": {
    name: "Full-Stack Developers",
    code: "FS",
  },
  "data-engineering": {
    name: "Data Engineers",
    code: "DE",
  },
};

const POSITIONS = [
  { key: "Goalkeeper", label: "Goalkeepers" },
  { key: "Defender", label: "Defenders" },
  { key: "Midfielder", label: "Midfielders" },
  { key: "Attacker", label: "Attackers" },
];

// Current active team
let activeTeam = "full-stack";

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  renderSquad(activeTeam);
});

function setupNavigation() {
  const navButtons = document.querySelectorAll(".team-nav-btn");

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const team = btn.dataset.team;

      // Update active states
      navButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Update active team and re-render
      activeTeam = team;
      renderSquad(team);
    });
  });
}

function renderSquad(teamKey) {
  const container = document.querySelector(".squad-container");
  if (!container) return;

  // Clear existing content
  container.innerHTML = "";

  // Get players for this team
  const teamPlayers = players.filter((p) => p.team === teamKey);

  // Group by position
  for (const position of POSITIONS) {
    const positionPlayers = teamPlayers
      .filter((p) => p.position === position.key)
      .sort((a, b) => {
        // Sort by number first
        const numA = typeof a.number === "number" ? a.number : 999;
        const numB = typeof b.number === "number" ? b.number : 999;
        if (numA !== numB) return numA - numB;
        return a.name.localeCompare(b.name);
      });

    if (positionPlayers.length === 0) continue;

    // Create position section
    const section = document.createElement("section");
    section.className = "position-section";
    section.dataset.position = position.key.toLowerCase();

    // Position header
    const header = document.createElement("header");
    header.className = "position-header";

    const title = document.createElement("h2");
    title.className = "position-title";
    title.textContent = position.label;

    const count = document.createElement("span");
    count.className = "position-count";
    count.textContent = positionPlayers.length;

    header.append(title, count);

    // Players grid
    const grid = document.createElement("div");
    grid.className = "players-grid";

    positionPlayers.forEach((player, index) => {
      const card = buildCard(player, TEAM_META[teamKey], index);
      grid.append(card);
    });

    section.append(header, grid);
    container.append(section);
  }
}

function buildCard(player, meta, index) {
  const card = document.createElement("article");
  card.className = "player-card";
  card.style.animationDelay = `${index * 0.05}s`;

  const link = document.createElement("a");
  link.className = "player-link";
  link.href = `player.html?id=${player.id}`;
  link.setAttribute("aria-label", `View profile for ${player.name}`);

  // Photo container (just the image, no overlay)
  const figure = document.createElement("figure");
  figure.className = "player-photo";

  // Image
  const image = document.createElement("img");
  image.src = `./Images/${player.photo}`;
  image.alt = player.name;
  image.loading = "lazy";

  figure.append(image);

  // Player info block (below photo, solid background)
  const info = document.createElement("div");
  info.className = "player-info";

  // Jersey number (small, above name)
  if (typeof player.number !== "undefined") {
    const jersey = document.createElement("span");
    jersey.className = "jersey-number";
    jersey.textContent = player.number;
    info.append(jersey);
  }

  // Split name into first name and last name
  const nameParts = player.name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  const nameContainer = document.createElement("div");
  nameContainer.className = "player-name";

  if (lastName) {
    const firstNameEl = document.createElement("span");
    firstNameEl.className = "first-name";
    firstNameEl.textContent = firstName;
    nameContainer.append(firstNameEl);
  }

  const lastNameEl = document.createElement("span");
  lastNameEl.className = "last-name";
  lastNameEl.textContent = lastName || firstName;
  nameContainer.append(lastNameEl);

  info.append(nameContainer);

  link.append(figure, info);
  card.append(link);

  return card;
}
