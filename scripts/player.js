const players = Array.isArray(globalThis.PLAYERS) ? globalThis.PLAYERS : [];

const TEAM_LABELS = {
  "full-stack": { name: "Full-Stack Developers", code: "FS" },
  "data-engineering": { name: "Data Engineers", code: "DE" },
};

const params = new URLSearchParams(window.location.search);
const playerId = params.get("id");
const player = players.find((item) => item.id === playerId);

const heading = document.getElementById("player-name-heading");
const intro = document.getElementById("player-intro");
const main = document.querySelector(".player-main");

if (!player) {
  if (heading) {
    heading.textContent = "Player not found";
  }
  if (intro) {
    intro.textContent =
      "We could not find the requested profile. Return to the squad list to pick another teammate.";
  }
  if (main) {
    main.innerHTML = `
      <a class="back-link" href="index.html">&larr; Back to squad</a>
      <section class="details-card">
        <h3>Missing profile</h3>
        <p>This profile is warming up elsewhere. Try another player from the main squad page.</p>
      </section>
    `;
  }
  document.title = "Player not found | Class Squad";
} else {
  document.title = `${player.name} | Class Squad 2025`;
  if (heading) {
    heading.textContent = player.name;
  }
  if (intro) {
    const teamDetails = TEAM_LABELS[player.team];
    const positionLabel = player.position
      ? `${player.position.toLowerCase()}`
      : "versatile playmaker";
    const teamLabel = teamDetails ? ` for the ${teamDetails.name}` : "";
    intro.textContent = `Scouting report for ${player.name}, our ${positionLabel}${teamLabel}.`;
  }

  const nameEl = document.getElementById("player-name");
  const roleEl = document.getElementById("player-role");
  const taglineEl = document.getElementById("player-tagline");
  const bioEl = document.getElementById("player-bio");
  const photoEl = document.getElementById("player-photo");
  const skillsEl = document.getElementById("player-skills");
  const positionEl = document.getElementById("player-position");
  const teamEl = document.getElementById("player-team");
  const jerseyEl = document.getElementById("player-number-badge");
  const badgeRow = document.querySelector(".player-badges");
  const dobEl = document.getElementById("player-dob");
  const birthEl = document.getElementById("player-birth");
  const strengthsEl = document.getElementById("player-strengths");
  const weaknessesEl = document.getElementById("player-weaknesses");
  const achievementEl = document.getElementById("player-achievement");
  const futureEl = document.getElementById("player-future");
  const funEl = document.getElementById("player-fun");
  const evaluationSection = document.getElementById("player-evaluation");

  if (photoEl) {
    photoEl.src = `./Images/${player.photo}`;
    photoEl.alt = `Portrait of ${player.name}`;
  }

  if (jerseyEl) {
    if (Number.isFinite(player.number)) {
      jerseyEl.textContent = String(player.number).padStart(2, "0");
      jerseyEl.hidden = false;
    } else {
      jerseyEl.hidden = true;
    }
  }

  if (nameEl) {
    nameEl.textContent = player.name;
  }

  if (roleEl) {
    roleEl.textContent = player.role;
  }

  if (positionEl) {
    if (player.position) {
      positionEl.textContent = player.position;
      positionEl.hidden = false;
    } else {
      positionEl.textContent = "";
      positionEl.hidden = true;
    }
  }

  if (teamEl) {
    const teamDetails = TEAM_LABELS[player.team];
    if (teamDetails) {
      teamEl.textContent = teamDetails.name;
      teamEl.hidden = false;
    } else {
      teamEl.textContent = "";
      teamEl.hidden = true;
    }
  }

  if (badgeRow) {
    const hasBadge =
      (positionEl && !positionEl.hidden && positionEl.textContent.trim()) ||
      (teamEl && !teamEl.hidden && teamEl.textContent.trim());
    badgeRow.hidden = !hasBadge;
  }

  if (taglineEl) {
    taglineEl.textContent = player.tagline;
  }

  if (bioEl) {
    bioEl.textContent = player.bio;
  }

  if (skillsEl) {
    skillsEl.innerHTML = "";
    for (const skill of player.skills) {
      const li = document.createElement("li");
      li.textContent = skill;
      skillsEl.append(li);
    }
  }

  if (dobEl) {
    dobEl.textContent = `${player.age} (${player.dob})`;
  }

  if (birthEl) {
    birthEl.textContent = "";
    const flag = createFlag(
      player.nationality.flagCode,
      player.nationality.country
    );
    if (flag) {
      birthEl.append(flag);
    }
    birthEl.append(`${player.birthPlace} · ${player.nationality.country}`);
  }

  if (strengthsEl) {
    strengthsEl.textContent = player.strengths;
  }

  if (weaknessesEl) {
    weaknessesEl.textContent = player.weaknesses;
  }

  if (achievementEl) {
    achievementEl.textContent = player.achievement;
  }

  if (futureEl) {
    futureEl.textContent = player.futurePlans || "To be announced.";
  }

  if (funEl) {
    funEl.textContent = player.funFact;
  }

  if (evaluationSection) {
    if (player.evaluation) {
      const copy = evaluationSection.querySelector(".evaluation-copy");
      if (copy) {
        copy.textContent = player.evaluation;
      }
      evaluationSection.hidden = false;
    } else {
      evaluationSection.hidden = true;
    }
  }
}

function createFlag(flagCode, country) {
  if (!flagCode) {
    return null;
  }
  const span = document.createElement("span");
  span.className = "flag-icon";
  span.dataset.flag = flagCode;
  span.setAttribute("role", "img");
  span.setAttribute("aria-label", `${country} flag`);
  return span;
}
