/**
 * Avatar Forge - Character Creator
 * Baseado no projeto original de Maicon Gabriel Friedel (MIT License)
 * Repo: https://github.com/maiconfriedel/random-avatar-generator
 * * MIT License - Copyright (c) 2019 Maicon Gabriel Friedel
 * (A permissão é concedida para uso, cópia e modificação, mantendo este aviso)
 **/

/**
 * SCRIPT.JS - A Inteligência do Editor de Avatar
 * Gerencia a lógica de navegação por setas, estado do avatar e renderização.
 */

import { avatarOptions } from './data.js';

/**
 * ESTADO GLOBAL DO AVATAR
 */
let state = {
    topType: "LongHairStraight",
    accessoriesType: "Blank",
    hairColor: "Black",
    facialHairType: "Blank",
    clotheType: "GraphicShirt",
    clotheColor: "Blue03",
    eyeType: "Default",
    eyebrowType: "Default",
    mouthType: "Smile",
    skinColor: "Light",
    // Configurações de Fundo (CSS)
    bgMode: 'solid',
    gradientType: 'linear',
    circleColor: "#6366f1",
    circleColor2: "#1e293b"
};

let currentIndices = {};
let activeColorSlot = 1;

/**
 * INICIALIZAÇÃO DA INTERFACE
 */
function init() {
    const container = document.getElementById('controls-container');
    if (!container) return;

    Object.keys(avatarOptions).forEach(key => {
        currentIndices[key] = 0;
        const category = avatarOptions[key];
        const card = document.createElement('div');
        card.className = "option-card animate-in";

        // Renderiza Grid de Cores para categorias de cores ou pele
        if (key.toLowerCase().includes('color') || key === 'skin') {
            card.innerHTML = `
                <label class="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-4 block">${category.label}</label>
                <div class="color-grid" id="grid-${key}">
                    ${category.items.map((item, index) => `
                        <div class="color-swatch ${index === 0 ? 'active' : ''}" 
                             style="background-color: ${getHexColor(item.v)}" 
                             onclick="handleSelectColor('${key}', ${index})"
                             id="swatch-${key}-${index}">
                        </div>
                    `).join('')}
                </div>`;
        } else {
            // Renderiza Navegação por Setas para categorias de formas
            card.innerHTML = `
                <label class="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-4 block">${category.label}</label>
                <div class="flex items-center justify-between bg-black/40 rounded-xl p-1">
                    <button onclick="handleSlide('${key}', -1)" class="arrow-btn"><i class="fas fa-chevron-left text-[11px]"></i></button>
                    <span id="label-${key}" class="text-[10px] font-black uppercase tracking-tighter text-slate-200">---</span>
                    <button onclick="handleSlide('${key}', 1)" class="arrow-btn"><i class="fas fa-chevron-right text-[11px]"></i></button>
                </div>`;
        }
        container.appendChild(card);
        updateLabel(key);
    });

    updateFrameColor();
    renderAvatar();
}

/**
 * NAVEGAÇÃO ENTRE ITENS (SETAS)
 */
window.handleSlide = function (key, direction) {
    const category = avatarOptions[key];
    const total = category.items.length;
    currentIndices[key] = (currentIndices[key] + direction + total) % total;
    const value = category.items[currentIndices[key]].v;

    // Regra de exclusão mútua: Se escolher um chapéu, "limpa" o cabelo e vice-versa
    if (['shortHair', 'longHair', 'hats'].includes(key)) {
        ['shortHair', 'longHair', 'hats'].forEach(k => {
            if (k !== key) {
                currentIndices[k] = -1;
                updateLabel(k);
            }
        });
        state.topType = value;
    } else {
        state[category.apiParam] = value;
    }

    updateLabel(key);
    renderAvatar();
};

/**
 * SELEÇÃO DE CORES
 */
window.handleSelectColor = function (key, index) {
    currentIndices[key] = index;
    const val = avatarOptions[key].items[index].v;

    if (key === 'bgColor') {
        if (state.bgMode === 'gradient') {
            if (activeColorSlot === 1) {
                state.circleColor = val;
                activeColorSlot = 2;
            } else {
                state.circleColor2 = val;
                activeColorSlot = 1;
            }
        } else {
            state.circleColor = val;
        }
        updateFrameColor();
    } else {
        state[avatarOptions[key].apiParam] = val;
        renderAvatar();
    }

    // Atualiza feedback visual na grade
    document.querySelectorAll(`#grid-${key} .color-swatch`).forEach(el => el.classList.remove('active'));
    document.getElementById(`swatch-${key}-${index}`).classList.add('active');
};

/**
 * CONTROLES DE FUNDO (UI)
 */
window.setBackgroundMode = function (mode) {
    state.bgMode = mode;
    document.getElementById('btn-solid').classList.toggle('btn-active', mode === 'solid');
    document.getElementById('btn-gradient').classList.toggle('btn-active', mode === 'gradient');
    document.getElementById('gradient-type-container').classList.toggle('hidden', mode === 'solid');
    updateFrameColor();
};

window.setGradientType = function (type) {
    state.gradientType = type;
    updateFrameColor();
};

/**
 * ATUALIZAÇÃO DO FRAME (BACKDROP)
 */
function updateFrameColor() {
    const frame = document.getElementById('avatar-frame');
    if (!frame) return;

    const c1 = state.circleColor;
    const c2 = state.circleColor2;

    if (state.bgMode === 'solid') {
        frame.style.background = c1;
    } else {
        const type = state.gradientType === 'linear' ? 'linear-gradient(135deg,' : 'radial-gradient(circle,';
        frame.style.background = `${type} ${c1}, ${c2})`;
    }
}

/**
 * RENDERIZAÇÃO DA IMAGEM (API)
 */
function renderAvatar() {
    const img = document.getElementById('avatar-img');
    if (!img) return;

    img.style.opacity = "0.4"; // Feedback de carregamento

    const params = new URLSearchParams({ avatarStyle: 'Transparent' });

    // Filtra apenas parâmetros que a API aceita
    Object.keys(state).forEach(k => {
        if (!['circleColor', 'circleColor2', 'bgMode', 'gradientType'].includes(k)) {
            params.append(k, state[k]);
        }
    });

    const finalUrl = `https://avataaars.io/?${params.toString()}&nocache=${Math.random()}`;

    // Pré-carregamento para evitar flicker (piscada branca)
    const tempImg = new Image();
    tempImg.src = finalUrl;
    tempImg.onload = () => {
        img.src = finalUrl;
        img.style.opacity = "1";
    };
}

function updateLabel(key) {
    const el = document.getElementById(`label-${key}`);
    if (el) {
        const idx = currentIndices[key];
        el.innerText = (idx === -1) ? "NENHUM" : avatarOptions[key].items[idx].n;
        el.style.opacity = (idx === -1) ? "0.4" : "1";
    }
}

/**
 * MAPEAMENTO DE CORES HEXADECIMAIS
 */
function getHexColor(v) {
    if (v === 'Transparent') return 'transparent';
    if (v.startsWith('#')) return v;

    const colors = {
        // Pele
        'Tanned': '#FD9841', 'Yellow': '#F8D25C', 'Pale': '#FFDBAC', 'Light': '#EDB98A',
        'Brown': '#D08B5B', 'DarkBrown': '#AE5D29', 'Black': '#262E33',
        // Cabelo
        'Auburn': '#A55728', 'Blonde': '#ECD189', 'BlondeGolden': '#E8BE5E', 'BrownDark': '#4A312C',
        'PastelPink': '#F59797', 'Platinum': '#ECF0F1', 'Red': '#C93305', 'SilverGray': '#E1E1E1',
        // Roupas
        'Blue01': '#65C9FF', 'Blue02': '#5199E4', 'Blue03': '#25557C', 'Gray01': '#E6E6E6',
        'Gray02': '#929598', 'Heather': '#3C4F5C', 'White': '#FFFFFF', 'Pink': '#FF488E'
    };

    return colors[v] || v || '#6366f1';
}

/**
 * FUNÇÃO ALEATÓRIO (GAMIFICAÇÃO)
 */
window.randomize = function () {
    Object.keys(avatarOptions).forEach(key => {
        const cat = avatarOptions[key];
        const idx = Math.floor(Math.random() * cat.items.length);

        if (key === 'bgColor') {
            state.circleColor = cat.items[idx].v;
            // Sorteia uma cor 2 diferente para o caso de gradiente
            state.circleColor2 = cat.items[Math.floor(Math.random() * cat.items.length)].v;
        } else {
            state[cat.apiParam] = cat.items[idx].v;
        }

        currentIndices[key] = idx;
        updateLabel(key);
    });

    updateFrameColor();
    renderAvatar();
};

window.onload = init;