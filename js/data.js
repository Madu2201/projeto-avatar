/**
 * Avatar Forge - Character Creator
 * Baseado no projeto original de Maicon Gabriel Friedel (MIT License)
 * Repo: https://github.com/maiconfriedel/random-avatar-generator
 * * MIT License - Copyright (c) 2019 Maicon Gabriel Friedel
 * (A permissão é concedida para uso, cópia e modificação, mantendo este aviso)
 */

/**
 * DATA.JS - O Dicionário de Peças do Avatar
 * Contém todas as variações de cabelo, acessórios, expressões e cores.
 */

export const avatarOptions = {
    // CATEGORIA: CABELOS CURTOS (COM OPÇÃO CARECA)
    shortHair: {
        label: "Cabelos Curtos",
        apiParam: "topType",
        items: [
            { n: "Careca", v: "NoHair" },
            { n: "César", v: "ShortHairTheCaesar" },
            { n: "César (Lado)", v: "ShortHairTheCaesarSidePart" },
            { n: "Dreads 01", v: "ShortHairDreads01" },
            { n: "Dreads 02", v: "ShortHairDreads02" },
            { n: "Frisado", v: "ShortHairFrizzle" },
            { n: "Mullet", v: "ShortHairShaggyMullet" },
            { n: "Curto Cacheado", v: "ShortHairShortCurly" },
            { n: "Curto Liso", v: "ShortHairShortFlat" },
            { n: "Curto Redondo", v: "ShortHairShortRound" },
            { n: "Curto Ondulado", v: "ShortHairShortWaved" },
            { n: "Curto Lados", v: "ShortHairSides" }
        ]
    },

    // CATEGORIA: CABELOS LONGOS E MÉDIOS
    longHair: {
        label: "Cabelos Longos",
        apiParam: "topType",
        items: [
            { n: "Liso 01", v: "LongHairStraight" },
            { n: "Liso 02", v: "LongHairStraight2" },
            { n: "Liso (Mecha)", v: "LongHairStraightStrand" },
            { n: "Afro", v: "LongHairBigHair" },
            { n: "Chanel", v: "LongHairBob" },
            { n: "Coque", v: "LongHairBun" },
            { n: "Cacheado", v: "LongHairCurly" },
            { n: "Ondulado", v: "LongHairCurvy" },
            { n: "Dreads", v: "LongHairDreads" },
            { n: "Frida", v: "LongHairFrida" },
            { n: "Fro", v: "LongHairFro" },
            { n: "Fro (Faixa)", v: "LongHairFroBand" },
            { n: "Médio", v: "LongHairNotTooLong" },
            { n: "Lados Raspados", v: "LongHairShavedSides" },
            { n: "Mia Wallace", v: "LongHairMiaWallace" }
        ]
    },

    // CATEGORIA: CHAPÉUS E COBERTURAS
    hats: {
        label: "Chapéus",
        apiParam: "topType",
        items: [
            { n: "Nenhum", v: "Blank" },
            { n: "Chapéu", v: "Hat" },
            { n: "Hijab", v: "Hijab" },
            { n: "Turbante", v: "Turban" },
            { n: "Touca 01", v: "WinterHat1" },
            { n: "Touca 02", v: "WinterHat2" },
            { n: "Touca 03", v: "WinterHat3" },
            { n: "Touca 04", v: "WinterHat4" }
        ]
    },

    // CATEGORIA: ACESSÓRIOS DE ROSTO
    accessories: {
        label: "Acessórios",
        apiParam: "accessoriesType",
        items: [
            { n: "Nenhum", v: "Blank" },
            { n: "Tapa Olho", v: "Eyepatch" },
            { n: "Kurt", v: "Kurt" },
            { n: "Grau 01", v: "Prescription01" },
            { n: "Grau 02", v: "Prescription02" },
            { n: "Redondo", v: "Round" },
            { n: "Óculos de Sol", v: "Sunglasses" },
            { n: "Wayfarers", v: "Wayfarers" }
        ]
    },

    // CATEGORIA: OLHOS
    eyes: {
        label: "Olhos",
        apiParam: "eyeType",
        items: [
            { n: "Padrão", v: "Default" },
            { n: "Fechados", v: "Close" },
            { n: "Chorando", v: "Cry" },
            { n: "Tonto", v: "Dizzy" },
            { n: "Revirando", v: "EyeRoll" },
            { n: "Feliz", v: "Happy" },
            { n: "Corações", v: "Hearts" },
            { n: "Lado", v: "Side" },
            { n: "Semicerrado", v: "Squint" },
            { n: "Surpreso", v: "Surprised" },
            { n: "Piscando", v: "Wink" },
            { n: "Piscando (Doido)", v: "WinkWacky" }
        ]
    },

    // CATEGORIA: SOBRANCELHAS
    eyebrows: {
        label: "Sobrancelhas",
        apiParam: "eyebrowType",
        items: [
            { n: "Padrão", v: "Default" },
            { n: "Bravo", v: "Angry" },
            { n: "Bravo Natural", v: "AngryNatural" },
            { n: "Natural", v: "DefaultNatural" },
            { n: "Retas", v: "FlatNatural" },
            { n: "Animado", v: "RaisedExcited" },
            { n: "Preocupado", v: "SadConcerned" },
            { n: "Monocelha", v: "UnibrowNatural" },
            { n: "Sobe e Desce", v: "UpDown" }
        ]
    },

    // CATEGORIA: BOCA
    mouth: {
        label: "Boca",
        apiParam: "mouthType",
        items: [
            { n: "Sorrindo", v: "Smile" },
            { n: "Normal", v: "Default" },
            { n: "Preocupado", v: "Concerned" },
            { n: "Descrença", v: "Disbelief" },
            { n: "Comendo", v: "Eating" },
            { n: "Careta", v: "Grimace" },
            { n: "Triste", v: "Sad" },
            { n: "Grito", v: "ScreamOpen" },
            { n: "Sério", v: "Serious" },
            { n: "Língua", v: "Tongue" },
            { n: "Vômito", v: "Vomit" }
        ]
    },

    // CATEGORIA: BARBA
    beard: {
        label: "Barba",
        apiParam: "facialHairType",
        items: [
            { n: "Sem Barba", v: "Blank" },
            { n: "Média", v: "BeardMedium" },
            { n: "Rala", v: "BeardLight" },
            { n: "Majestosa", v: "BeardMagestic" },
            { n: "Bigode Fino", v: "MoustacheFancy" },
            { n: "Bigodão", v: "MoustacheMagnum" }
        ]
    },

    // CATEGORIA: ROUPAS
    clothes: {
        label: "Vestuário",
        apiParam: "clotheType",
        items: [
            { n: "Blazer e Camisa", v: "BlazerShirt" },
            { n: "Blazer e Suéter", v: "BlazerSweater" },
            { n: "Suéter Gola Alta", v: "CollarSweater" },
            { n: "Camiseta Estampada", v: "GraphicShirt" },
            { n: "Moletom", v: "Hoodie" },
            { n: "Macacão", v: "Overall" },
            { n: "Gola Redonda", v: "ShirtCrewNeck" },
            { n: "Gola U", v: "ShirtScoopNeck" },
            { n: "Gola V", v: "ShirtVNeck" }
        ]
    },

    // CATEGORIA: CORES DE PELE
    skin: {
        label: "Pele",
        apiParam: "skinColor",
        items: [
            { n: "Clara", v: "Light" },
            { n: "Bronzeada", v: "Tanned" },
            { n: "Amarela", v: "Yellow" },
            { n: "Pálida", v: "Pale" },
            { n: "Morena", v: "Brown" },
            { n: "Escura", v: "DarkBrown" },
            { n: "Preta", v: "Black" }
        ]
    },

    // CATEGORIA: CORES DE CABELO
    hairColor: {
        label: "Cor do Cabelo",
        apiParam: "hairColor",
        items: [
            { n: "Preto", v: "Black" },
            { n: "Castanho", v: "Brown" },
            { n: "Castanho Escuro", v: "BrownDark" },
            { n: "Loiro", v: "Blonde" },
            { n: "Loiro Dourado", v: "BlondeGolden" },
            { n: "Ruivo", v: "Auburn" },
            { n: "Vermelho", v: "Red" },
            { n: "Cinza", v: "SilverGray" },
            { n: "Rosa Pastel", v: "PastelPink" },
            { n: "Platina", v: "Platinum" }
        ]
    },

    // CATEGORIA: CORES DE ROUPA
    clotheColor: {
        label: "Cor da Roupa",
        apiParam: "clotheColor",
        items: [
            { n: "Azul Claro", v: "Blue03" },
            { n: "Preto", v: "Black" },
            { n: "Azul Escuro", v: "Blue01" },
            { n: "Cinza", v: "Gray01" },
            { n: "Verde Pastel", v: "PastelGreen" },
            { n: "Vermelho", v: "Red" },
            { n: "Branco", v: "White" },
            { n: "Rosa", v: "Pink" }
        ]
    },

    // CATEGORIA: CORES DE FUNDO (COM OPÇÃO TRANSPARENTE)
    bgColor: {
        label: "Cor de Fundo",
        apiParam: "circleColor",
        items: [
            { n: "Transparente", v: "Transparent" },
            { n: "Índigo", v: "#6366f1" },
            { n: "Grafite", v: "#1e293b" },
            { n: "Vinho", v: "#7f1d1d" },
            { n: "Esmeralda", v: "#065f46" },
            { n: "Dourado", v: "#854d0e" },
            { n: "Rosa", v: "#9d174d" },
            { n: "Roxo", v: "#581c87" },
            { n: "Preto", v: "#000000" }
        ]
    }
};