const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf-8');

// remove old BookShowcase
code = code.replace(
`      {/* PULL QUOTE / BookShowcase（フル詳細）はデスクトップのみ */}
      <div className="hidden cv-auto sm:block">
        <PullQuote />
        <BookShowcase />
      </div>`,
`      {/* PULL QUOTEはデスクトップのみ */}
      <div className="hidden cv-auto sm:block">
        <PullQuote />
      </div>`
);

// insert BookShowcase right under BookCoversStrip
code = code.replace(
`      {/* 1. KDP 参考書 6 冊 — 全分野を体系的に読みたい人へ */}
      <div className="cv-auto">
        <BookCoversStrip />
      </div>`,
`      {/* 1. KDP 参考書 6 冊 — 全分野を体系的に読みたい人へ */}
      <div className="cv-auto">
        <BookCoversStrip />
      </div>

      <div className="cv-auto">
        <BookShowcase />
      </div>`
);

fs.writeFileSync('src/app/page.tsx', code);
