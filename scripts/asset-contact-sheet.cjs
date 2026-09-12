const fs = require('node:fs');
const path = require('node:path');
const sharp = require(require.resolve('sharp',{paths:[require.resolve('next/package.json')]}));
async function main() {
 const names=fs.readdirSync('public/media').filter(n=>/^(valve-|feature-|models|sizing|conveying|mixers).*\.webp$/.test(n));
 const tiles=await Promise.all(names.map(async(name,i)=>({input:await sharp(path.join('public/media',name)).resize(240,200,{fit:'contain',background:'#fff'}).extend({bottom:30,background:'#fff'}).composite([{input:Buffer.from(`<svg width="240" height="30"><text x="10" y="21" font-size="16">${name}</text></svg>`),top:200,left:0}]).png().toBuffer(),left:(i%5)*240,top:Math.floor(i/5)*230})));
 await sharp({create:{width:1200,height:Math.ceil(names.length/5)*230,channels:3,background:'#ddd'}}).composite(tiles).png().toFile('asset-contact-sheet.png');
}
main().catch(e=>{console.error(e);process.exit(1)});
