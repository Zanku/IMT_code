import {Injectable, OnInit} from '@angular/core';
import { Element } from './element';

  const MAX_LENGTH = 100;
  const MIN_LENGTH = 2;



@Injectable({
  providedIn: 'root'
})
export class CalcDataService implements OnInit{

  private operation = {
  '+' : this.operandsSumming,
  '-' : this.operandsSubtraction,
  '*' : this.operandsMultipling,
  '/' : this.operandsSeparation
}

   calcLength : number = MIN_LENGTH;
       values : string[] = [];
        signs : string[] = [];
       result : number;

  constructor() {
    this.elemsInit();
  }

  ngOnInit(){
  }


  getValues() : string[] {
    return this.values;
  }

  addValue( element : Element ){
    this.values[ element.index ] = element.aValue;
  }

  getSigns() : string[] {
    return this.signs;
  }

  addSign( element : Element ){
    this.signs[ element.index ] = element.aValue;
  }

  getLength() : number {
    return this.calcLength;
  }

  setLength( len : number ){
    this.calcLength = this.lengthMinValueCheak( len );
    this.elemsInit();
  }

  lengthMinValueCheak( len : number ){
    if ( len < MIN_LENGTH ){
      return MIN_LENGTH;
    } else {
      return len;
    }
  }

  getMAX_LENGTH() : number{
    return MAX_LENGTH;
  }

  getMIN_LENGTH() : number{
    return MIN_LENGTH;
  }

  elemsInit(){
    this.   calcLength = this.getLength();
    this. signs.length = MIN_LENGTH - 1;
    this.values.length = MIN_LENGTH;

    for ( let i = 0; i < (this.calcLength - 1); i++){
      this.values[i] = "";
      this. signs[i] = "";
    }
    this.values[ this.calcLength - 1 ] =  "";
  }

  getResult() : number {
    return this.result;
  }

  calculateResultEval(){
    try{
      this.result = eval( this.getStringResult() );
    }
    catch (e){
      console.log(`calculateResultEval has some troubles: ${e}`);
    }
  }

  getStringResult() : string {
    let result = '';

    for ( let i = 0; i < this.signs.length; i++ ){
      result += this.values[ i ] + this.signs[ i ]
    }
    result += this.values[ this.signs.length ];

    return result;
  }

  clearData(){
    this.elemsInit();
    this.result = undefined;
  }




// functions for SECOND module


  calculateResultSecond() : number {
    this.result = this.operation[
        this.signCheak(
            this.signs[0]
        )
    ]( this.values[0], this.values[1] );

    return this.result
  }

  operandsSumming( first : number, second : number ){
    return first + second;
  }

  operandsSubtraction( first : number, second : number ){
    return first - second;
  }

  operandsMultipling( first : number, second : number ){
    return first * second;
  }

  operandsSeparation( first : number, second : number ){
    return first / second;
  }

  signsListInit() : string[] {
    let signsList : string[] = [];
    for ( let key in this.operation ){
      signsList.push( key )
    }
    return signsList;
  }

  signCheak( sign : string ){
    if ( this.operation[ sign ] ){
        return sign
    } else {
      return '+'
    }
  }
}
