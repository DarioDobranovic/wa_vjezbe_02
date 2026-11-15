
import express from 'express';
import { nekretnine } from './nekretnine.js';

const router = express.Router();

const ponude = [];
let sljedeci_id = 1;

router.post('/', (req, res) => {
    const nova_ponuda = req.body;
    const kljucevi = Object.keys(nova_ponuda);

    if (!(kljucevi.includes('id_nekretnine') &&
          kljucevi.includes('ime') &&
          kljucevi.includes('prezime') &&
          kljucevi.includes('ponudjena_cijena') &&
          kljucevi.includes('broj_telefona'))) {
        return res.status(400).json({ message: 'Niste poslali sve potrebne podatke.' });
    }

    if (isNaN(nova_ponuda.id_nekretnine) ||
        isNaN(nova_ponuda.ponudjena_cijena) ||
        nova_ponuda.ponudjena_cijena < 0) {
        return res.status(400).json({ message: 'Neispravni podaci.' });
    }

    const nekretnina = nekretnine.find(nekretnina => nekretnina.id == nova_ponuda.id_nekretnine);

    if (!nekretnina) {
        return res.status(404).json({ message: 'Nekretnina nije pronađena.' });
    }

    nova_ponuda.id = sljedeci_id++;
    ponude.push(nova_ponuda);

    res.status(201).json(nova_ponuda);
});

export default router;
