const mongoose = require('mongoose');
const Saamaan = require('./models/saamaan-model');
var data = [{
        name:"Nepal",
        img:"https://wallpaperaccess.com/full/1410601.jpg",
        desc:['hi','myname','is','anish','joshi'],
        price:1000
    },
    {
        name:"United States",
        img:"https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg",
        desc:['haskdfasd','mynasdafme','isdafs','aniasdfsh','josdfshi'],
        price:12000
    },
    {
        name:"France",
        img:"https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png",
        desc:['hdsfi','myngdfsaame','isads','anisadsh','joshasdi'],
        price:2000
    }
]
function seedDB() {
    //Remove all campgrounds
    Saamaan.deleteMany({},function(err,allcampgroundRemoved){
        if(err){
            console.log(err);
        }else {
            console.log('Removed Campground');
              //add a few campgrounds
            data.forEach(function(seed){
                Saamaan.create(seed,function(err,saamaan){
                    if(err){
                        console.log(err);
                    }else {
                        console.log("added a saamaan");
                    }
                });
            });
        }
    });
}
module.exports = seedDB;
