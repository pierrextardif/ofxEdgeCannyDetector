#pragma once

#include "ofMain.h"

#include "ofxEdgeCannyDetector.hpp"

class ofApp : public ofBaseApp{
	public:
		void setup();
		void update();
		void draw();
		
		void keyPressed(int key);
        
        ofxEdgeCannyDetector edgeDetector;
        ofImage img;
};
