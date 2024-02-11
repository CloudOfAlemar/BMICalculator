"use strict";

const systemMetric = document.querySelector( ".system-metric input" );
const systemImperial = document.querySelector( ".system-imperial input" );

const metricForm = document.querySelector( ".metric-form" );
const metricMeasurements = document.querySelector( ".metric-measurements" );
const heightMetric = document.querySelector( "#height-metric" );
const weightMetric = document.querySelector( "#weight-metric" );

const imperialForm = document.querySelector( ".imperial-form" );
const imperialMeasurements = document.querySelector( ".imperial-measurements" );
const imperialFt = document.querySelector( ".imperial-ft" );
const imperialIn = document.querySelector( ".imperial-in" );
const imperialSt = document.querySelector( ".imperial-st" );
const imperialLbs = document.querySelector( ".imperial-lbs" );

const bmiWelcome = document.querySelector( ".bmi-welcome" );
const bmiResults = document.querySelector( ".bmi-results" );
const bmiYieldSpan = document.querySelector( ".bmi-yield span" );
const healthLevel = document.querySelector( ".health-level" );
const bmiMinMax = document.querySelector( ".bmi-min-max" );

const calculateMetricBMI = function( heightcm, weightkg ) {
  return ( weightkg / Math.pow( ( heightcm / 100 ), 2 ) ).toFixed( 1 );
}

const calculateImperialBMI = function( feet, inches, stone, pounds ) {
  const totalInches = ( Number( feet ) * 12 ) + Number( inches );
  const totalPounds = ( Number( stone ) * 14 ) + Number( pounds );
  return ( ( totalPounds / Math.pow( totalInches, 2 ) ) * 703 ).toFixed( 1 );
}

const showHide = function( show, hide ) {
  show.classList.remove( "hide" );
  hide.classList.add( "hide" );
}

systemMetric.addEventListener( "click", function() {
  if( metricMeasurements.classList.contains( "hide" ) ) {
    metricMeasurements.classList.remove( "hide" );
    imperialMeasurements.classList.add( "hide" );
    showHide( bmiWelcome, bmiResults );
    [ imperialFt, imperialIn, imperialSt, imperialLbs ].forEach( input => {
      input.value = "";
    } );
  }
} );

systemImperial.addEventListener( "click", function() {
  if( imperialMeasurements.classList.contains( "hide" ) ) {
    imperialMeasurements.classList.remove( "hide" );
    metricMeasurements.classList.add( "hide" );
    showHide( bmiWelcome, bmiResults );
    [ heightMetric, weightMetric ].forEach( input => {
      input.value = "";
    } );
  }
} );

metricForm.addEventListener( "submit", function( event ) {
  event.preventDefault();
  const bmiMetric = calculateMetricBMI( heightMetric.value, weightMetric.value );
  const floatBMIMetric = parseFloat( bmiMetric );
  bmiYieldSpan.textContent = bmiMetric;

  const bmiHealthLevel = floatBMIMetric < 18.5 ? "underweight" :
                       floatBMIMetric < 24.9 ? "a healthy weight" :
                       floatBMIMetric < 29.9 ? "overweight" : "obese";

  // calculate minweight
  const minWeight = ( Math.pow( heightMetric.value/100, 2 ) * 18.5 ).toFixed( 1 );
  // calculate maxweight
  const maxWeight = ( Math.pow( heightMetric.value/100, 2 ) * 24.9 ).toFixed( 1 );

  healthLevel.textContent = bmiHealthLevel;
  bmiMinMax.textContent = `${ minWeight }kg - ${ maxWeight }kg`;
  bmiWelcome.classList.add( "hide" );
  bmiResults.classList.remove( "hide" );
} );

imperialForm.addEventListener( "submit", function( event ) {
  event.preventDefault();
  const imperialBMI = calculateImperialBMI( imperialFt.value, imperialIn.value, imperialSt.value, imperialLbs.value );
  const floatImperialBmi = parseFloat( imperialBMI );
  const bmiHealthLevel = floatImperialBmi < 18.5 ? "underweight" :
                         floatImperialBmi < 24.9 ? "a healthy weight" :
                         floatImperialBmi < 29.9 ? "overweight" : "obese";

  const minWeightPounds = Math.trunc( 18.5 * Math.pow( ( Number( imperialFt.value ) * 12 ) + Number( imperialIn.value ), 2 ) / 703 );
  const minSt = Math.trunc( minWeightPounds / 14 );
  const minLbs = minWeightPounds % 14;
 
  const maxWeightPounds = Math.trunc( 24.9 * Math.pow( ( Number( imperialFt.value ) * 12 ) + Number( imperialIn.value ), 2 ) / 703 );
  const maxSt = Math.trunc( maxWeightPounds / 14 );
  const maxLbs = maxWeightPounds % 14;

  bmiYieldSpan.textContent = imperialBMI;
  healthLevel.textContent = bmiHealthLevel;
  bmiMinMax.textContent = `${ minSt }st ${ minLbs }lbs - ${ maxSt }st ${ maxLbs }lbs`
  bmiWelcome.classList.add( "hide" );
  bmiResults.classList.remove( "hide" );
} );

// On Inut Change
heightMetric.addEventListener( "input", function() {
  if( heightMetric.value === "" ) showHide( bmiWelcome, bmiResults );
} );

weightMetric.addEventListener( "input", function() {
  if( weightMetric.value === "" ) showHide( bmiWelcome, bmiResults );
} );

const imperialInputs = [ imperialFt, imperialIn, imperialSt, imperialLbs ];
imperialInputs.forEach( input => {
  input.addEventListener( "input", function() {
    if( input.value === "" ) showHide( bmiWelcome, bmiResults );
  } );
} );