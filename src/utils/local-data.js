let Modules = [
    {
        id: 'matematika',
        title: 'Matematika',
        body: 'Matematika adalah bidang ilmu, yang mencakup studi tentang topik-topik seperti bilangan (aritmetika dan teori bilangan), rumus dan struktur terkait (aljabar), bangun dan ruang tempat mereka berada (geometri),dan besaran serta perubahannya (kalkulus dan analisis)',
        createdAt: 'Sabtu, 10 Desember 2022',
    },
    {
        id: 'inggris',
        title: 'B.Inggris',
        body: 'Bahasa Inggris merupakan salah satu mata pelajaran yang termasuk dalam mata pelajaran adaptif. Mata pelajaran Bahasa Inggris merupakan salah satu mata pelajaran yang diajarkan guna meningkatkan keterampilan anak didik untuk berbahasa. Inti dasar penguasaan bahasa adalah sebagai suatu alat untuk berkomunikasi.',
        createdAt: 'Sabtu, 10 Desember 2022',
    }
];

function getAllModules() {
    return Modules;
}

function getModule(id) {
    const foundedModule = Modules.find((module) => module.id === id);
    return foundedModule;
}

function getActiveModules() {
    const activeModules = Modules.filter((module) => !module.archived);
    return activeModules;
}

function editModule({ id, title, body }) {
    const moduleToEdit = Modules.find((module) => module.id === id);
    moduleToEdit.title = title;
    moduleToEdit.body = body;

    Modules = Modules.map((module) => {
        if (module.id === id) {
            return module;
        }
        return module;
    });
}

export {
    getAllModules,
    getActiveModules,
    editModule,
    getModule,
};