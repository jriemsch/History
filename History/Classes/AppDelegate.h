//
//  AppDelegate.h
//  History
//
//  Created by Jens Riemschneider on 5/2/12.
//  Copyright __MyCompanyName__ 2012. All rights reserved.
//

#import <UIKit/UIKit.h>
#ifdef PHONEGAP_FRAMEWORK
	#import <PhoneGap/PhoneGapDelegate.h>
#else
	#import "PhoneGapDelegate.h"
#endif

@interface AppDelegate : PhoneGapDelegate <UIScrollViewDelegate> {
	NSString* invokeString;
//    UIView* _imageContainer;
    id<UIScrollViewDelegate> oldDelegate;
//    CGRect originalFrame;
//    float _originalScale;
    char* _quality[16];
}

- (UIImage*)getImageAtRow:(int)row col:(int)col;
- (NSString*)getImageQualityAtRow:(int)row col:(int)col;

@property (copy)  NSString* invokeString;

@end

