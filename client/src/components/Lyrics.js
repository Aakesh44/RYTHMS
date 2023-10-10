import React from 'react'

const Lyrics = ({text}) => {
  // const text = `enna villyareke enna villyareke sonna viliku wang varuvaen vil urencallum taruwan ind anokikhandu viendhu pogiraen oru mofiillamal maunamakhinen oru mofiillamal maunamakhinen enna villyareke sonna viliku wang varuvaen vil urencallum taruwan ind anokikhandu viendhu pogiraen o oru mofiillamal oru mofiillamal maunamakhinen oru mofiillamal maunamakhinen badaitan isaivan unaiye malatan udane avane anocap patikum diddmay munukk unnuton charndatu en vizhi serndatu vidiya vidiya matiil kitakkum pon veenai un mani meittus en mani virbhavinil vandhu kalanditu viralpat mellak kanindidu udal mattum ingu kitakkudu udan vandhu neum uyir kodu pallavan chicipigus andu panniya chinapttil ondru pennena vandatu indru silaiye pallavan chicipigus andu panniya chinapttil ondru pennena vandatu indru silaiye undhan anokukkill itu enna villyareke sonna viliku wang varuvaen vil urencallum taruwan ind anokikhandu viendhu pogiraen o oru mofiillamal oru mofiillamal maunamakhinen uyire unaiye ninandhu vivineer mazhaiyil nanandhu imail irukkum iravu urakkam gan vittup boiachu karanm niyachu nilavu erica nineu kodikk aarat nenjachu akaram nanjhachu dinam dinam unai ninikwen thurumben udal ilikiheen uyir kondu varum patumaiye unaivit illai putumaiye un pugazh vaiyamum solla chicirona vasalil ulla chithra vedkudu mella uyire un pugazh vaiyamum solla chicirona vasalil ulla chithra vedkudu mella nall naal unai naanum serum nalthan enna villyareke enna villyareke sonna viliku wang varuvaen vil urencallum taruwan ind anokikhandu viendhu pogiraen o oru mofiillamal oru mofiillamal maunamakhinen oru mofiillamal maunamakhinen oru mofiillamal maunamakhinen`;
  const wordsPerLine = 4; 

const splitText = text?.split(' ');
// console.log(splitText);
if(!splitText){
  return(<h1>hii</h1>)
}
const lines = [];
let currentLine = [];

for (const word of splitText) {
  if (currentLine.length < wordsPerLine) {
    currentLine.push(word);
  } else {
    lines.push(currentLine.join(" "));
    currentLine = [word];
  }
}


  return (
    <main className=' w-full h-fit'>      
      {lines.map((words,ind)=>
        <p key={ind} className='mb-1 text-base font-semibold Textgrey hover:text-white'>{words}</p>
      )}
      
    </main>
  )
}

export default Lyrics