import { barangHilang } from './data-barang.js';

let dataGudang = [...barangHilang];

export const lihatSemuaBarang = () => {
    return dataGudang;
};

export const lihatBarangById = (id) => {
    const barang = dataGudang.find(item => item.id === id);
    return barang;
};

export const tambahBarang = ({ nama, ditemukanOleh, isMagical }) => {
    const idTerakhir = dataGudang.reduce((maxId, item) => Math.max(item.id, maxId), 0);
    const barangBaru = {
        id: idTerakhir + 1,
        nama,
        ditemukanOleh,
        isMagical,
        status: "Belum Diambil",
        diambilOleh: null
    };
    dataGudang.push(barangBaru);
    return barangBaru;
};

export const perbaruiBarang = (id, dataUpdate) => {
    const indexBarang = dataGudang.findIndex(item => item.id === id);

    if (indexBarang === -1) {
        return { error: `Barang tidak ditemukan.` };
    }

    const barangLama = dataGudang[indexBarang];
    const barangDiperbarui = {
        ...barangLama,
        ...dataUpdate,
        id: barangLama.id // Memastikan ID tidak bisa diubah
    };

    dataGudang[indexBarang] = barangDiperbarui;
    return { data: barangDiperbarui };
};

export const hapusBarang = (id) => {
    const indexBarang = dataGudang.findIndex(item => item.id === id);

    if (indexBarang === -1) {
        return { error: `Barang tidak ditemukan` };
    }

    const barangDihapus = dataGudang.splice(indexBarang, 1);
    return { data: barangDihapus[0] };
};