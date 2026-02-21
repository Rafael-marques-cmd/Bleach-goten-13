// Mapa de imagens locais para miniaturas (.pf) e imagens completas
import yamamotoPf from "../../assets/yamamoto-pf.jpeg";
import yamamotoFull from "../../assets/yamamoto-img1.jpeg";

import soiFonPf from "../../assets/soi-fon-pf.jpeg";
import soiFonFull from "../../assets/soi-fon-img1.jpeg";

import rojuroPf from "../../assets/rojuro-pf.jpg";
import rojuroFull from "../../assets/rojuro-img1.jpg";

import unohanaPf from "../../assets/unohana-pf.jpeg";
import unohanaFull from "../../assets/unohana-img1.jpeg";

import shinjiPf from "../../assets/shinji-pf.jpeg";
import shinjiFull from "../../assets/shinji-img2.jpeg";

import byakuyaPf from "../../assets/byakuya-pf.jpeg";
import byakuyaFull from "../../assets/byakuya-img1.jpeg";

import komamuraPf from "../../assets/komamura-pf.jpeg";
import komamuraFull from "../../assets/komamura-pf.jpeg";

import kyorakuPf from "../../assets/kyoraku-pf.jpeg";
import kyorakuFull from "../../assets/kyoraku-img2.jpeg";

import hitsugayaPf from "../../assets/hitsugaya-pf.jpeg";
import hitsugayaFull from "../../assets/hitsugaya-img1.jpeg";

import kenpachiPf from "../../assets/kenpach-pf .jpeg";
import kenpachiFull from "../../assets/kenpachi-img1.jpeg";

import mayuriPf from "../../assets/mayuri-pf.jpeg";
import mayuriFull from "../../assets/mayuri-img2.jpeg";

import ukitakePf from "../../assets/ukitake-pf.jpeg";
import ukitakeFull from "../../assets/ukitake-img1.jpeg";

import kenseiPf from "../../assets/kensei-pf.jpeg";
import kenseiFull from "../../assets/kensei-img1.jpeg";

// Nem todos os capitães têm imagens locais; use mapas apenas quando existir
export const thumbMap: Record<string, string> = {
  "1": yamamotoPf,
  "2": soiFonPf,
  "3": rojuroPf,
  "4": unohanaPf,
  "5": shinjiPf,
  "6": byakuyaPf,
  "7": komamuraPf,
  "8": kyorakuPf,
  "9": kenseiPf,
  "10": hitsugayaPf,
  "11": kenpachiPf,
  "12": mayuriPf,
  "13": ukitakePf,
};

export const fullMap: Record<string, string> = {
  "1": yamamotoFull,
  "2": soiFonFull,
  "3": rojuroFull,
  "4": unohanaFull,
  "5": shinjiFull,
  "6": byakuyaFull,
  "7": komamuraFull,
  "8": kyorakuFull,
  "9": kenseiFull,
  "10": hitsugayaFull,
  "11": kenpachiFull,
  "12": mayuriFull,
  "13": ukitakeFull,
};

// Gera um mapa de galerias (img1,img2,img3...) a partir dos assets
const assets = import.meta.glob("/src/assets/*.{jpeg,jpg,png}", {
  as: "url",
  eager: true,
}) as Record<string, string>;
const assetList = Object.entries(assets).map(([path, url]) => {
  const name = path.split("/").pop()!.toLowerCase();
  return { path, url, name };
});

// Mapeamento base (nome usado nos arquivos em assets: e.g. 'yamamoto-img1.jpg')
const baseNameMap: Record<string, string> = {
  "1": "yamamoto",
  "2": "soi-fon",
  "3": "rojuro",
  "4": "unohana",
  "5": "shinji",
  "6": "byakuya",
  "7": "komamura",
  "8": "kyoraku",
  "9": "kensei",
  "10": "hitsugaya",
  "11": "kenpachi",
  "12": "mayuri",
  "13": "ukitake",
};

export const galleryMap: Record<string, string[]> = {};

Object.keys(thumbMap).forEach((id) => {
  const base = baseNameMap[id];
  if (!base) {
    galleryMap[id] = [];
    return;
  }

  // Filtra arquivos que começam com '{base}-img' (ex: 'yamamoto-img1.jpg')
  const matched = assetList
    .filter((a) => a.name.startsWith(`${base}-img`))
    .map((a) => ({ url: a.url, name: a.name }));

  // Ordena por número dentro do nome (img1, img2...) quando possível
  matched.sort((a, b) => {
    const na = a.name.match(/img(\d+)/);
    const nb = b.name.match(/img(\d+)/);
    const va = na ? parseInt(na[1], 10) : 0;
    const vb = nb ? parseInt(nb[1], 10) : 0;
    return va - vb;
  });

  galleryMap[id] = matched.map((m) => m.url);
});
