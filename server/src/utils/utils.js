const fs = require('fs');

const dir = `${__dirname}/../../uploads`;

function getAllSubdirectories(dir) {
  const subdirs = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const path = `${dir}/${file}`;
    const stat = fs.statSync(path);
    if (stat.isDirectory()) {
      subdirs.push(path);
      subdirs.push(...getAllSubdirectories(path));
    }
  }
  return subdirs;
}

async function removeTempFiles() {
  const now = Date.now();
  const subdirs = getAllSubdirectories(dir);
  subdirs.forEach((subdir, index) => {
    const files = fs.readdirSync(subdir);
    files.forEach((file) => {
      const path = `${subdir}/${file}`;
      const { ctimeMs } = fs.statSync(path);
      if (file.startsWith('temp-') && now - ctimeMs > 60 * 60 * 1000) fs.unlinkSync(path);
    });
  });
}

  setInterval(removeTempFiles, 5 * 60 * 1000);

