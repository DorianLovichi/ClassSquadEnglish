const players = Array.isArray(globalThis.PLAYERS) ? globalThis.PLAYERS : [];

const grid = document.querySelector(".squad-grid");

if (grid) {
  const fragment = document.createDocumentFragment();

  for (const player of players) {
    fragment.append(buildCard(player));
  }

  grid.append(fragment);
}

function buildCard(player) {
  const card = document.createElement("article");
  card.className = "player-card";

  const link = document.createElement("a");
  link.className = "player-link";
  link.href = `player.html?id=${player.id}`;
  link.setAttribute("aria-label", `Open profile for ${player.name}`);

  const figure = document.createElement("figure");
  figure.className = "player-photo";

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

  info.append(nameHeading, rolePara, taglinePara, skillList);
  link.append(figure, info);
  card.append(link);

  return card;
}
