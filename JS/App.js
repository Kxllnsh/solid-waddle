console.clear();
setInterval(function(){
    $('.preloader').fadeOut();
}, 4000);

$(document).ready(function(){
    // Get a request from API
    $('#form').submit(function (event){
        event.preventDefault();

        const ip = $('#input-search').val();

            if(ip === '' || ip === null){
                const errorMessage = document.querySelector('.error-popup');
                errorMessage.classList.add('error-popup-show');

                setInterval(function (){
                    errorMessage.classList.add('error-popup-hide');
                }, 3000);
                return false;
            }

        document.querySelector('.input-wrapper').style.display='none';

            const refreshBTN = document.querySelector('.refresh');

            refreshBTN.style.display='grid'

            refreshBTN.addEventListener('click', ()=>{
                window.location.reload();
            })


        const API_KEY = 'f87f8b5a8cf6428d966e8e6a83bf1766';

        const url = "https://api.ipgeolocation.io/ipgeo?apiKey="+API_KEY+"&ip="+ip+"";

        const ipAdd = document.getElementById('ip');
        const locationAdd = document.getElementById('location');
        const timeZoneAdd = document.getElementById('timezone');
        const IspAdd = document.getElementById('isp');

        $.get(url, async function(data){
            //console.log(data)

            let location = data.country_name;

            const timeZone = data.time_zone.name;

            const ISP = data.isp;


            const ipAdd = document.getElementById('ip');
            const locationAdd = document.getElementById('location');
            const timeZoneAdd = document.getElementById('timezone');
            const IspAdd = document.getElementById('isp');

            const lat = parseFloat(data.latitude);
            const long = parseFloat(data.longitude);

            function dataInfo(){
                ipAdd.innerText = ip
                locationAdd.innerText = location
                timeZoneAdd.innerText = timeZone
                IspAdd.innerText = ISP
            }
            dataInfo();

            function mapInit(){
                const platform = new H.service.Platform({
                    'apikey': 'clq_amkR9lMg04IWTZvT0-MS1Vy_DfrRcFv3LcpporY'
                });

                const mapTypes = platform.createDefaultLayers();

                const map = new H.Map(document.getElementById('mapContainer'),
                    mapTypes.vector.normal.map,
                    {
                        zoom: 9,
                        center: {lat: `${lat}`, lng: `${long}`},
                        pixelRatio: window.devicePixelRatio || 1
                    });

                const icon = new H.map.Icon('/images/map-pin-solid.svg');

                const marker = new H.map.Marker({lat: `${lat}`, lng: `${long}`}, {icon: icon});

                map.addObject(marker);

                window.addEventListener('resize', ()=> map.getViewPort().resize());

                const behaviour = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

                const ui = H.ui.UI.createDefault(map, mapTypes);
            }

            mapInit();
        })
    })

})

