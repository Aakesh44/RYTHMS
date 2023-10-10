import React, { useContext } from 'react'
import BrowseCards from './BrowseCards'
import DataContext from '../context/DataContext'

const Browse = () => {

  const {homeWidth} = useContext(DataContext)

  const cards = [
    {title:'Podcasts',img:"https://img.freepik.com/free-vector/podcast-concept-with-people-chatting_23-2148788150.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=sph",code:'#ff5733'},
    {title:'Live Events',img:"https://img.freepik.com/free-photo/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space_637285-559.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=ais",code:'#232331'},
    {title:'Made For You',img:"https://img.freepik.com/free-vector/make-your-move-typography-style-illustration_53876-40672.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=ais",code:'#4286f4'},
    {title:'New Release',img:"https://img.freepik.com/free-vector/playlist-concept-illustration_114360-6596.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=ais",code:'#32cd32'},
    {title:'Love',img:"https://img.freepik.com/free-vector/flat-international-kissing-day-illustration_23-2148878760.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=ais",code:'#ffd700'},
    {title:'Sad',img:"https://img.freepik.com/free-vector/flat-illustration-world-music-day-celebration_23-2150404876.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=ais",code:'#ff1493'},
    {title:'Hindi',img:"https://img.freepik.com/free-vector/bollywood-lettering-with-shiny-mandala-background_23-2148470399.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=ais",code:'#ff1493'},
    {title:'Tamil',img:"https://img.freepik.com/free-vector/happy-pongal-festival-tamil-nadu-india-celebration-background_1035-26264.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=sph",code:'#ff9c00'},
    {title:'Telegu',img:"https://img.freepik.com/premium-vector/bonalu-festival-written-telugu-telangana-woman-carrying-bonalu-their-head_560226-949.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=sph",code:'#8b008b'},
    {title:'Pop',img:"https://img.freepik.com/free-vector/boombox-concept-illustration_114360-6401.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=ais",code:'#00ced1'},
    {title:'Trending',img:"https://img.freepik.com/free-vector/tiny-people-near-hashtag-social-media-flat-illustration_74855-11115.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=sph",code:'#ff4500'},
    {title:'Mood',img:"https://img.freepik.com/free-vector/antigravity-people-background_52683-3773.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=ais",code:'#FF69B4'},
    {title:'Party',img:"https://img.freepik.com/free-vector/dj-party-concept-illustration_114360-14924.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=ais",code:'#4682B4'},
    {title:'Devotional',img:"https://img.freepik.com/free-vector/happy-vasant-panchami-celebration-card-background_1035-21958.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=ais",code:'#006400'},
    {title:'Decades',img:"https://img.freepik.com/free-vector/karaoke-vintage-illustration-composition_1284-39713.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=ais",code:'#006400'},
    {title:'Hip-Hop',img:"https://img.freepik.com/free-vector/rap-music-singers-symbols-template_1284-25043.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=ais",code:'#00BFFF'},
    {title:'Chill',img:"https://img.freepik.com/free-vector/hand-drawn-flat-design-metaverse-background_23-2149257282.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=ais",code:'#8A2BE2'},
    {title:'Gaming',img:"https://img.freepik.com/free-vector/character-playing-video-games-eating-snacks_23-2148537996.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=ais",code:'#FFD700'},
    {title:'K-pop',img:"https://img.freepik.com/free-vector/k-pop-music-illustration_23-2148630550.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=ais",code:'#9932CC'},
    {title:'Workout',img:"https://img.freepik.com/free-vector/training-home-concept_23-2148500626.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=ais",code:'#ADFF2F'},
    {title:'Rocks',img:"https://img.freepik.com/free-vector/hand-drawn-indie-music-illustration_23-2149596226.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=ais",code:'#7CFC00'},
    {title:'Metal',img:"https://img.freepik.com/free-vector/guitar-player-background-hand-drawn-style_23-2147622560.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=ais",code:'#4169E1'},
    {title:'Focus',img:"https://img.freepik.com/free-vector/man-taking-care-her-mental-health_23-2148513216.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=ais",code:'#008B8B'},
    {title:'Classical',img:"https://img.freepik.com/free-vector/flat-illustration-magh-bihu-festival_23-2149963616.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=ais",code:'#CD5C5C'},
    {title:'Disney',img:"https://img.freepik.com/free-vector/singer-bee-cartoon-character-with-empty-banner_1308-102170.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=ais",code:'#FF6347'},
    {title:'Soul',img:"https://img.freepik.com/free-vector/jazz-trumpeter-music-notes_23-2147493203.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=ais",code:'#4B0082'},
    {title:'Anime',img:"https://img.freepik.com/free-vector/realistic-samurai-illustrated-background_52683-69457.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=ais",code:'#FF00FF'},
    {title:'Punk',img:"https://img.freepik.com/free-vector/cute-blue-character-listening-music-illustration_614304-37.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=ais",code:'#9370DB'},
    {title:'Ambient',img:"https://img.freepik.com/free-vector/hand-drawn-flat-design-metaverse-background_23-2149257282.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=ais",code:'#00FF00'},
    {title:'Blues',img:"https://img.freepik.com/free-vector/watercolor-international-jazz-day-illustration_23-2148888742.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=ais",code:'#FFA500'},
    {title:'Alternative',img:"https://img.freepik.com/free-vector/playing-guitar-concept-illustration_114360-16961.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=ais",code:'#7B68EE'},
    {title:'Wellness',img:"https://img.freepik.com/free-vector/flat-happy-teen-headphones-sitting-home-chair-using-tablet-online-self-education-smiling-man-relaxing-listening-music-radio-lecture-podcast-digital-audiobook-device_88138-520.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=ais",code:'#228B22'},
    {title:'Travel',img:"https://img.freepik.com/free-vector/hand-drawn-flat-bloggers-pack_23-2149076205.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=ais",code:'#E9967A'},
    {title:'caribbean',img:"https://img.freepik.com/free-vector/latin-music-band-illustration_23-2149588271.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=ais",code:'#800000'},
    {title:'Afro',img:"https://img.freepik.com/free-vector/latin-music-band-illustration_23-2149587177.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=ais",code:'#7FFF00'},
    {title:'Summer',img:"https://img.freepik.com/free-vector/hello-summer-background-with-cute-fruits_23-2147813861.jpg?size=626&ext=jpg&ga=GA1.2.935296291.1680001946&semt=ais",code:'#FA8072'},
    {title:'Netflix',img:"https://img.freepik.com/free-vector/docking-station-concept-illustration_335657-5569.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=ais",code:'#FF69B4'},
    {title:'Latin',img:"https://img.freepik.com/free-vector/people-celebrating-cinco-de-mayo-concept-illustration_114360-5353.jpg?size=626&ext=jpg&ga=GA1.1.935296291.1680001946&semt=ais",code:'#00CED1'}
  ]

  return (
    <main className='MarginTop mb-16 sm:mb-0 w-full h-full bg-balck'>
      <header className='h-fit w-full grid text-2xl font-bold px-4'>Browse all</header>

      <section

      style={{gridTemplateColumns:
         homeWidth > 1300 ? "repeat(7,1fr)" :
         homeWidth > 1100 ? "repeat(6,1fr)" :
         homeWidth > 800 ? "repeat(4,1fr)" :
         homeWidth > 600 ? "repeat(3,1fr)" :

         "repeat(2,1fr)" 
      }}

      className='w-full h-full grid gap-5 p-5'>

      
      {cards.map((card,ind)=>(
        <BrowseCards title={card.title} img={card.img} code={card.code} key={ind}/>
      ))}
      </section>

    </main>
  )
}

export default Browse