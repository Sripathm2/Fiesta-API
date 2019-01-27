import React from 'react';
import '../css/book.css';
import '../css/standardize.css';
import '../css/styles.css';
import axios from 'axios'

const book = () => (
    <div className="App body page-index clearfix">
      <div class="element element-1"></div>
      <div id="main" class="element element-2 js-main"></div>
      <p class="text text-1 js-heading">NoTebook View</p>
      <div id="book" class="element element-3 js-book"></div>
      <div id="namelikedislike" class="element element-4 js-namelikedislike"></div>
      <p id="bookname" class="text text-2 js-bookname">NoTebook Name</p>
      <p class="text text-3"></p>
      <div id="likedislike" class="element element-5 js-likedislike"></div>
      <div id="like" class="element element-6 js-like"></div>
      <p id="semicolon1" class="text text-4 js-semicolon1">:</p>
      <p id="likecounT" class="text text-5 js-likecoun-t">0</p>
      <div id="dislike" class="element element-7 js-dislike"></div>
      <p id="semicolon2" class="text text-6 js-semicolon2">:</p>
      <p class="text text-7">0</p>
      <p id="commenT" class="text text-8 js-commen-t">CommenT SecTion</p>
      <div id="commenTDiv" class="element element-8 js-commen-t-div"></div>
    </div>
);

/*axios(){

}*/