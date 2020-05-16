#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    edgeDetector.setup();
    img.load("TheDavid.png");
}

//--------------------------------------------------------------
void ofApp::update(){

}

//--------------------------------------------------------------
void ofApp::draw(){
    edgeDetector.begin();
    img.draw(0,0);
    edgeDetector.end();
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
}
