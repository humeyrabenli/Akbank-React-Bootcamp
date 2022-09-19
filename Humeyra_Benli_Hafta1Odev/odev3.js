/**
 * Size verilen javascript dosyasında halihazırda array
 * ve fonksiyon isimleri yer alıyor. Aşağıdaki fonksiyonların
 * içerisine aldığı parametrelere göre comment satırındaki istenileni yapabilecek kod yazmanız bekleniyor.
 */

const folders = [
  {
    id: 5,
    name: "Klasör 1",
    files: [
      { id: 17, name: "profil.jpg" },
      { id: 18, name: "manzara.jpg" },
    ],
  },
  {
    id: 6,
    name: "Klasör 2",
    files: [
      { id: 17, name: "profil.jpg" },
      { id: 22, name: "dosya.xls" },
    ],
  },
  {
    id: 7,
    name: "Klasör 3",
  },
];

//move(17,6) // dosyayı klasöre taşıyacak
//copy(18,7) // kopyasını oluşturacak
//remove(17) // dosyayı silecek
//removeFolder(6) //klasörü ve altındaki tüm dosyaları silecek
//parentFolderOf(17) // ==> 5

const move = (fileId, folderId) => {
  const file = fileFinder(fileId);
  const folder = folderFinder(folderId);
  if (file && folder) {
    const index = file.files.findIndex((file) => file.id === fileId);
    folder.files = folder.files ? folder.files : [];
    folder.files.push(file.files[index]);
    file.files.splice(index, 1);
    console.log(folders);
  } else {
    console.log("File or folder not found");
  }
};

const copy = (fileId, folderId) => {
  const file = fileFinder(fileId);
  const folder = folderFinder(folderId);
  if (file && folder) {
    const index = file.files.findIndex((file) => file.id === fileId);
    folder.files = folder.files ? folder.files : [];
    folder.files.push(file.files[index]);
    console.log(folders);
  } else {
    console.log("File or folder not found");
  }
};

const remove = (fileId) => {
  const file = fileFinder(fileId);
  if (file) {
    const index = file.files.findIndex((file) => file.id === fileId);
    file.files.splice(index, 1);
    console.log(folders);
  } else {
    console.log("File not found");
  }
};

const removeFolder = (folderId) => {
  const folder = folderFinder(folderId);
  if (folder) {
    const index = folders.findIndex((folder) => folder.id === folderId);
    folders.splice(index, 1);
    console.log(folders);
  } else {
    console.log("Folder not found");
  }
};

const parentFolderOf = (fileId) => {
  folders.map((folder) => {
    if (folder.files && folder.files.length > 0) {
      folder.files.map((file) => {
        if (file.id === fileId) {
          console.log(folder.id);
        }
      });
    }
  });
};

const fileFinder = function (id) {
  return folders.find((folder) => folder.files.find((file) => file.id === id));
};

const folderFinder = function (id) {
  return folders.find((folder) => folder.id === id);
};
