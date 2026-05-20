const fs = require('fs');
let c = fs.readFileSync('src/components/sections/Hero.tsx', 'utf8');
let b64 = c.substring(c.indexOf('base64,') + 7, c.indexOf('" x="0"'));
c = c.replace(/<svg[\s\S]*?<\/svg>/, '<img src="data:image/png;base64,' + b64 + '" alt="The Dot Logo" className="h-16 md:h-24 lg:h-32 w-auto object-contain z-20" />');
fs.writeFileSync('src/components/sections/Hero.tsx', c);
console.log('Fixed');
