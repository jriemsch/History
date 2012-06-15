//
//  ImageContainerScrollViewDelegate.m
//  History
//
//  Created by Jens Riemschneider on 5/5/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "ImageContainerScrollViewDelegate.h"

@implementation ImageContainerScrollViewDelegate

- (id)initWithZoomView:(UIView*)zoomView {
    if (self = [super init]) {
        _zoomView = zoomView;
    }
    return self;
}

- (UIView *)viewForZoomingInScrollView:(UIScrollView *)scrollView {
    return _zoomView;
}


@end
