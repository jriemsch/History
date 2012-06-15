//
//  ImageContainerScrollViewDelegate.h
//  History
//
//  Created by Jens Riemschneider on 5/5/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ImageContainerScrollViewDelegate : NSObject<UIScrollViewDelegate> {
    UIView* _zoomView;
}

- (id)initWithZoomView:(UIView*)zoomView;

@end

