var url = 'https://pokeapi.co/api/v2/pokemon/ditto';

React.useEffect callback
    console.log（'use effect')；

  fetch(url). then(function (results) {
results. json ()
• then (function (data) i console. log(data);
console. log(data. name); setName (data. name);
setAbilities(data abilities);
｝）
*   Catch(function(e) { console. log(e); })
*   finally(function(){ setLoading(false); });
