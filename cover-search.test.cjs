const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(__dirname+'/app.js','utf8');
const context=vm.createContext({URLSearchParams,AbortController,setTimeout,clearTimeout});
vm.runInContext(source.slice(source.indexOf('function normalizedCoverText'),source.indexOf('function scheduleCoverLookup')),context);
const run=s=>vm.runInContext(s,context);
assert.equal(run("canonicalIsbn('0-385-47257-9')"),'9780385472579');
assert.equal(run("canonicalIsbn('9780385472578')"),'');
assert.equal(run("exactCoverIsbn({isbns:['0385472579']},{isbn:'9780385472579'})"),true);
assert.equal(run("isStrongCoverMatch({score:135,title:'Dune',author:'Frank Herbert',isbns:[]},{isbn:'9780385472579',title:'Dune',author:'Frank Herbert'})"),false);
assert.equal(run("isStrongCoverMatch({score:300,isbns:['9780385472579']},{isbn:'0385472579'})"),true);
assert.equal(run("isStrongCoverMatch({score:135,isbns:[]},{title:'Dune'})"),false);
assert.ok(run("coverMatchScore({title:'Dune',author:'Frank Herbert',isbns:[],publisher:'Ace',year:'2000'},{title:'Dune',author:'Frank Herbert',publisher:'Ace',year:'2000'})")>run("coverMatchScore({title:'Dune',author:'Frank Herbert',isbns:[],publisher:'Other',year:'1990'},{title:'Dune',author:'Frank Herbert',publisher:'Ace',year:'2000'})"));
assert.equal(new URL(run("googleCoverSearchUrl({isbn:'0385472579'})")).searchParams.get('q'),'9780385472579 Buchcover');
vm.runInContext(`hasCyrillicText=()=>false; coverImageAvailable=async()=>false;
fetchCoverJson=async url=>{
 if(url.includes('/isbn/'))return {title:'Dune',covers:[1],works:[]};
 if(url.includes('search.json'))return {docs:[{title:'Dune',author_name:['Frank Herbert'],cover_i:2,isbn:['9780385472579']}]};
 return {items:[]};
};`,context);
(async()=>{
 const results=await run("findCoverCandidates({isbn:'9780385472579',title:'Dune',author:'Frank Herbert'})");
 assert.equal(results[0].score,300);
 assert.equal(results.find(c=>c.url.includes('/2-')).isbns.length,0);
 assert.ok(results.find(c=>c.url.includes('/2-')).score<300);
 console.log('10 cover matching and source regression checks passed.');
})().catch(e=>{console.error(e);process.exitCode=1});
