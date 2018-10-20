# My-Neighborhood-Map SUSHI-GO-SEEK

see the source files at https://github.com/wtRinaldi/My-Neighborhood-Map/tree/master

## Description

SUSHI-GO-SEEK is a responsive single page application that utilizes the FourSquare API to find sushi restaurants within the Scottdale AZ area and the Google Maps API to display them.  
The organizational framework Knockout.js was used to create an MVVM design pattern.  
This project has been completed to meets the requirements for the Udacity project.  Greater functionality, such as searching any location or radius, will be coming soon.   

## Features

- responsive (although simplistic) design using bootstrap
- map markers are populated on the map at the location of the sushi restaurant.
- list is filterable by entering the name of the sushi location that you are looking for in the search bar
- filtering the list also filters the map markers
- clicking a map marker will cause an infoWindow to open and animate the map marker
- closing the infoWindow will also stop animation
- clicking sushi location from the list will open the infoWindow

## Installation

The application can been found at: http://wtrinaldi.github.io/My-Neighborhood-Map/

## Design Pattern

Design patterns assist in developing manageable codebases. Frameworks can decrease the time required developing an application
and provide a number of utilities. Third-party APIs provide valuable data sets that can improve the application's quality, 
for ex.: knockout.js helps to simplify dynamic JavaScript UIs using the Model-View-ViewModel (MVVM) pattern.


## APIs

* https://developers.google.com/maps/documentation/javascript/
* https://developer.foursquare.com/

## Contact

williamtrinaldi@gmail.com

## Notes
This project is on my list to rework since foursquare has since changed their API
