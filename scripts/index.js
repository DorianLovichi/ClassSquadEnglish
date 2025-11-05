const players = Array.isArray(globalThis.PLAYERS) ? globalThis.PLAYERS : [];

const TEAM_META = [
  {
    key: "full-stack",
    name: "Full-Stack Developers",
    code: "FS",
    formation: "4-3-3",
    chant: "High press delivery built on end-to-end ownership and resilience.",
  },
  {
    key: "data-engineering",
    name: "Data Engineers",
    code: "DE",
    formation: "3-4-3",
    chant: "Precision analytics keeps every play measured and on target.",
  },
];

const POSITION_ORDER = ["Goalkeeper", "Defender", "Midfielder", "Attacker"];

updateScoreboard(players);

const container = document.querySelector(".teams-grid");

if (container) {
  for (const meta of TEAM_META) {
    const roster = players
      .filter((player) => player.team === meta.key)
      .sort(comparePlayers);

    if (!roster.length) {
      continue;
    }

    const section = buildTeamSection(meta, roster);
    container.append(section);
  }
}

function comparePlayers(a, b) {
  const indexA = POSITION_ORDER.indexOf(a.position);
  const indexB = POSITION_ORDER.indexOf(b.position);
  const safeA = indexA === -1 ? POSITION_ORDER.length : indexA;
  const safeB = indexB === -1 ? POSITION_ORDER.length : indexB;

  if (safeA !== safeB) {
    return safeA - safeB;
  }

  const numberA =
    typeof a.number === "number" ? a.number : Number.POSITIVE_INFINITY;
  const numberB =
    typeof b.number === "number" ? b.number : Number.POSITIVE_INFINITY;

  if (numberA !== numberB) {
    return numberA - numberB;
  }

  return a.name.localeCompare(b.name);
}

function buildTeamSection(meta, roster) {
  const section = document.createElement("section");
  section.className = "team-section";
  section.dataset.team = meta.key;

  const header = document.createElement("header");
  header.className = "team-header";

  const title = document.createElement("div");
  title.className = "team-title";

  const heading = document.createElement("h2");
  heading.textContent = meta.name;

  const copy = document.createElement("p");
  copy.textContent = meta.chant;

  title.append(heading, copy);

  const record = document.createElement("div");
  record.className = "team-record";

  const label = document.createElement("span");
  label.className = "team-record-label";
  label.textContent = "Line-up";

  const value = document.createElement("span");
  value.className = "team-record-value";
  value.textContent = `${meta.formation} · ${String(roster.length).padStart(
    2,
    "0"
  )} players`;

  record.append(label, value);
  header.append(title, record);

  const grid = document.createElement("div");
  grid.className = "formation-grid";

  for (const player of roster) {
    grid.append(buildCard(player, meta));
  }

  section.append(header, grid);
  return section;
}

function buildCard(player, meta) {
  const card = document.createElement("article");
  card.className = "player-card";

  const link = document.createElement("a");
  link.className = "player-link";
  link.href = `player.html?id=${player.id}`;
  link.setAttribute(
    "aria-label",
    `Open profile for ${player.name}, ${player.position || "player"} on the ${
      meta.name
    }.`
  );

  const figure = document.createElement("figure");
  figure.className = "player-photo";

  if (typeof player.number !== "undefined") {
    const jersey = document.createElement("span");
    jersey.className = "jersey-number";
    jersey.textContent = formatNumber(player.number);
    figure.append(jersey);
  }

  const image = document.createElement("img");
  image.src = `./Images/${player.photo}`;
  image.alt = `Portrait of ${player.name}`;
  image.loading = "lazy";

  const hover = document.createElement("figcaption");
  hover.className = "player-hover";
  hover.textContent = "View profile";

  figure.append(image, hover);

  const info = document.createElement("div");
  info.className = "player-info";

  const nameHeading = document.createElement("h2");
  nameHeading.textContent = player.name;

  const rolePara = document.createElement("p");
  rolePara.className = "card-role";
  rolePara.textContent = player.role;

  const metaRow = document.createElement("div");
  metaRow.className = "player-meta";

  if (player.position) {
    const positionBadge = document.createElement("span");
    positionBadge.className = "position-badge";
    positionBadge.textContent = player.position;
    metaRow.append(positionBadge);
  }

  const teamChip = document.createElement("span");
  teamChip.className = "team-chip";
  teamChip.textContent = meta.code;
  teamChip.setAttribute("aria-label", meta.name);
  teamChip.title = meta.name;
  metaRow.append(teamChip);

  const taglinePara = document.createElement("p");
  taglinePara.className = "card-tagline";
  taglinePara.textContent = player.tagline;

  const skillList = document.createElement("ul");
  skillList.className = "player-skills";

  for (const skill of player.skills.slice(0, 3)) {
    const li = document.createElement("li");
    li.textContent = skill;
    skillList.append(li);
  }

  info.append(nameHeading, rolePara, metaRow, taglinePara, skillList);
  link.append(figure, info);
  card.append(link);

  return card;
}

function formatNumber(value) {
  if (Number.isFinite(value)) {
    return String(value).padStart(2, "0");
  }
  return "--";
}

function updateScoreboard(allPlayers) {
  const board = document.querySelector(".scoreboard");
  if (!board) {
    return;
  }

  for (const meta of TEAM_META) {
    const node = board.querySelector(
      `.scoreboard-team[data-team="${meta.key}"]`
    );
    if (!node) {
      continue;
    }

    const roster = allPlayers.filter((player) => player.team === meta.key);

    const codeEl = node.querySelector(".scoreboard-code");
    if (codeEl) {
      codeEl.textContent = meta.code;
    }

    const nameEl = node.querySelector(".scoreboard-name");
    if (nameEl) {
      nameEl.textContent = meta.name;
    }

    const countEl = node.querySelector("[data-count]");
    if (countEl) {
      countEl.textContent = String(roster.length).padStart(2, "0");
    }

    const formationEl = node.querySelector("[data-formation]");
    if (formationEl) {
      formationEl.textContent = meta.formation;
    }
  }
}
