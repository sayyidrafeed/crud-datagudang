import http from 'http';
import * as serviceGudang from './service-gudang.js';

const PORT = 3000;
const HOST = 'localhost';

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = req.url;
    const method = req.method;
    const idMatch = url.match(/\/barang\/(\d+)/);
    const id = idMatch ? parseInt(idMatch[1]) : null;

    try {
        if (url === '/barang' && method === 'GET') {
            const semuaBarang = serviceGudang.lihatSemuaBarang();
            res.writeHead(200);
            res.end(JSON.stringify(semuaBarang));

        } else if (id && method === 'GET') {
            const barang = serviceGudang.lihatBarangById(id);
            if (!barang) {
                res.writeHead(404);
                res.end(JSON.stringify({ message: `Barang tidak ditemukan` }));
            } else {
                res.writeHead(200);
                res.end(JSON.stringify(barang));
            }

        } else if (url === '/barang' && method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => {
                const dataBarangBaru = JSON.parse(body);
                const barangBaru = serviceGudang.tambahBarang(dataBarangBaru);
                res.writeHead(201);
                res.end(JSON.stringify(barangBaru));
            });

        } else if (id && method === 'PUT') {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => {
                const dataUpdate = JSON.parse(body);
                const hasil = serviceGudang.perbaruiBarang(id, dataUpdate);
                if (hasil.error) {
                    res.writeHead(404);
                    res.end(JSON.stringify({ message: hasil.error }));
                } else {
                    res.writeHead(200);
                    res.end(JSON.stringify(hasil.data));
                }
            });
        } else if (id && method === 'DELETE') {
            const hasil = serviceGudang.hapusBarang(id);
            if (hasil.error) {
                res.writeHead(404);
                res.end(JSON.stringify({ message: hasil.error }));
            } else {
                res.writeHead(200);
                res.end(JSON.stringify({ message: `"${hasil.data.nama}" berhasil dihapus.` }));
            }
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'Endpoint ra ono' }));
        }
    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ message: 'Servernya kaya Leads, MBB 500', error: error.message }));
    }
});

server.listen(PORT, HOST, () => {
    console.log(`Server berjalan di http://${HOST}:${PORT}`);
});
