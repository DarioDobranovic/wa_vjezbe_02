
import express from 'express';

const router = express.Router();

const nekretnine = [
    { id: 1, naziv: 'Stan u Puli', opis: 'Dvosoban stan', cijena: 180000, lokacija: 'Pula', broj_soba: 2, povrsina: 65 },
    { id: 2, naziv: 'Kuca u Medulinu', opis: 'Kuca s vrtom', cijena: 280000, lokacija: 'Medulin', broj_soba: 4, povrsina: 140 },
    { id: 3, naziv: 'Apartman u Rovinju', opis: 'Apartman blizu mora', cijena: 190000, lokacija: 'Rovinj', broj_soba: 2, povrsina: 55 }
];

let sljedeci_id = 4;

router.get('/', (req, res) => {
    res.status(200).json(nekretnine);
});

router.get('/:id', (req, res) => {
    const id_nekretnine = req.params.id;

    if (isNaN(id_nekretnine)) {
        return res.status(400).json({ message: 'ID nekretnine mora biti broj.' });
    }

    const nekretnina = nekretnine.find(nekretnina => nekretnina.id == id_nekretnine);

    if (nekretnina) {
        return res.status(200).json(nekretnina);
    } else {
        return res.status(404).json({ message: 'Nekretnina nije pronađena.' });
    }
});


router.post('/', (req, res) => {
    const nova_nekretnina = req.body;
    const kljucevi = Object.keys(nova_nekretnina);

    if (!(kljucevi.includes('naziv') &&
          kljucevi.includes('opis') &&
          kljucevi.includes('cijena') &&
          kljucevi.includes('lokacija') &&
          kljucevi.includes('broj_soba') &&
          kljucevi.includes('povrsina'))) {
        return res.status(400).json({ message: 'Niste poslali sve potrebne podatke.' });
    }

    if (isNaN(nova_nekretnina.cijena) || nova_nekretnina.cijena < 0 ||
        isNaN(nova_nekretnina.broj_soba) || nova_nekretnina.broj_soba < 0 ||
        isNaN(nova_nekretnina.povrsina) || nova_nekretnina.povrsina < 0) {
        return res.status(400).json({ message: 'Neispravni podaci.' });
    }

    nova_nekretnina.id = sljedeci_id++;
    nekretnine.push(nova_nekretnina);

    res.status(201).json(nova_nekretnina);
});


router.put('/:id', (req, res) => {
    const id_nekretnine = req.params.id;
    const nova_nekretnina = req.body;

    if (isNaN(id_nekretnine)) {
        return res.status(400).json({ message: 'ID nekretnine mora biti broj.' });
    }

    const kljucevi = Object.keys(nova_nekretnina);

    if (!(kljucevi.includes('naziv') &&
          kljucevi.includes('opis') &&
          kljucevi.includes('cijena') &&
          kljucevi.includes('lokacija') &&
          kljucevi.includes('broj_soba') &&
          kljucevi.includes('povrsina'))) {
        return res.status(400).json({ message: 'Niste poslali sve potrebne podatke.' });
    }

    if (isNaN(nova_nekretnina.cijena) || nova_nekretnina.cijena < 0 ||
        isNaN(nova_nekretnina.broj_soba) || nova_nekretnina.broj_soba < 0 ||
        isNaN(nova_nekretnina.povrsina) || nova_nekretnina.povrsina < 0) {
        return res.status(400).json({ message: 'Neispravni podaci.' });
    }

    const index = nekretnine.findIndex(nekretnina => nekretnina.id == id_nekretnine);

    if (index !== -1) {
        nova_nekretnina.id = nekretnine[index].id;
        nekretnine[index] = nova_nekretnina;
        res.status(200).json(nekretnine[index]);
    } else {
        res.status(404).json({ message: 'Nekretnina nije pronađena.' });
    }
});



router.patch('/:id', (req, res) => {
    const id_nekretnine = req.params.id;
    const nova_nekretnina = req.body;

    const index = nekretnine.findIndex(nekretnina => nekretnina.id == id_nekretnine);

    if (index !== -1) {
        for (const key in nova_nekretnina) {
            nekretnine[index][key] = nova_nekretnina[key];
        }

        res.json(nekretnine[index]);
    } else {
        res.json({ message: 'Nekretnina s traženim ID-em ne postoji.' });
    }
});



router.delete('/:id', (req, res) => {
    const id_nekretnine = req.params.id;

    if (isNaN(id_nekretnine)) {
        return res.status(400).json({ message: 'ID nekretnine mora biti broj.' });
    }

    const index = nekretnine.findIndex(nekretnina => nekretnina.id == id_nekretnine);

    if (index !== -1) {
        nekretnine.splice(index, 1);
        res.status(200).json({ message: 'Nekretnina uspješno obrisana.' });
    } else {
        res.status(404).json({ message: 'Nekretnina nije pronađena.' });
    }
});

export { nekretnine };
export default router;
