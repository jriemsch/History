//
//  AppDelegate.m
//  History
//
//  Created by Jens Riemschneider on 5/2/12.
//  Copyright __MyCompanyName__ 2012. All rights reserved.
//

#import "AppDelegate.h"
#ifdef PHONEGAP_FRAMEWORK
	#import <PhoneGap/PhoneGapViewController.h>
#else
	#import "PhoneGapViewController.h"
#endif

#import "ImageContainerScrollViewDelegate.h"

@implementation AppDelegate

@synthesize invokeString;

- (id) init {	
    _quality[ 0] = "llmmmmmmmmmmmmml";
    _quality[ 1] = "hhhmmmmmhhmmmmmm";
    _quality[ 2] = "hhhhmmmhhhhhhhmm";
    _quality[ 3] = "mmhhhhlhhhhhhhhm";
    _quality[ 4] = "llhhhhlhhhhhhhhl";
    _quality[ 5] = "llhhhllhhhhhhhhl";
    _quality[ 6] = "llmhhllhhhhhhhll";
    _quality[ 7] = "lmlhhmlhmhhhhhll";
    _quality[ 8] = "llllhhlhhhhhhhll";
    _quality[ 9] = "lllmhhmmhhhlhhll";
    _quality[10] = "llllhmhlhhllhhhm";
    _quality[11] = "mlllhhhlhhhllhhm";
    _quality[12] = "llllhhmlhhhllhhm";
    _quality[13] = "llllhhllhhlllhhh";
    _quality[14] = "llllhhllllllllhh";
    _quality[15] = "llllhmmllllmllll";
    
//    _originalScale = 10.0f;
      
    return [super init];
}

/**
 * This is main kick off after the app inits, the views and Settings are setup here. (preferred - iOS4 and up)
 */
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {    
    NSURL* url = [launchOptions objectForKey:UIApplicationLaunchOptionsURLKey];
    if (url && [url isKindOfClass:[NSURL class]])
    {
        self.invokeString = [url absoluteString];
		NSLog(@"History launchOptions = %@",url);
    }    
    
    BOOL result = [super application:application didFinishLaunchingWithOptions:launchOptions];
    
/*    _imageContainer = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 512 * 16, 200 * 16)];
    for (int row = 0; row < 16; ++row) {
        for (int col = 0; col < 16; ++col) {
            UIImage* image = [self getImageAtRow:row col:col];
            UIImageView* imageView = [[UIImageView alloc] initWithImage:image];
            [imageView setFrame:CGRectMake(col * 512, row * 200, 512, 200)];
            [_imageContainer addSubview:imageView];
            [imageView release];
            [image release];
        }
    }*/
    
	return result;
}

- (UIImage*)getImageAtRow:(int)row col:(int)col {
    NSString* quality = [self getImageQualityAtRow:row col:col];
    NSString* path = [NSString stringWithFormat:@"www/images/map/%@/slice_%i_%i", quality,row, col];
    NSString* resourcePath = [[NSBundle mainBundle] pathForResource:path ofType:@"jpg"];
    UIImage* image = [[UIImage alloc] initWithContentsOfFile:resourcePath];
    return image;
}

- (NSString*)getImageQualityAtRow:(int)row col:(int)col {
    switch (_quality[row][col]) {
        case 'h' : return @"high";
        case 'm' : return @"mid";
        case 'l' : return @"low";
    }
    return @"";
}
/*
- (UIView *)viewForZoomingInScrollView:(UIScrollView *)scrollView {
    if ([oldDelegate respondsToSelector:@selector(viewForZoomingInScrollView:)]) {
        return [oldDelegate viewForZoomingInScrollView:scrollView];
    }
    return nil;
}
 
- (void)scrollViewDidScroll:(UIScrollView *)scrollView {
    if ([oldDelegate respondsToSelector:@selector(scrollViewDidScroll:)]) {
        [oldDelegate scrollViewDidScroll:scrollView];
    }
}

- (void)scrollViewDidZoom:(UIScrollView *)scrollView {
    float scale = scrollView.zoomScale;
    
    float x = originalFrame.origin.x * scale;
    float y = originalFrame.origin.y * scale;
    float width = originalFrame.size.width * scale;
    float height = originalFrame.size.height * scale;
    _imageContainer.transform = CGAffineTransformMakeScale(_originalScale * scale, _originalScale * scale);
    
    _imageContainer.frame = CGRectMake(x, y, width, height);
    
    if ([oldDelegate respondsToSelector:@selector(scrollViewDidZoom:)]) {
        [oldDelegate scrollViewDidZoom:scrollView];
    }
}

- (void)scrollViewWillBeginDragging:(UIScrollView *)scrollView {
    if ([oldDelegate respondsToSelector:@selector(scrollViewWillBeginDragging:)]) {
        [oldDelegate scrollViewWillBeginDragging:scrollView];
    }
}

- (void)scrollViewWillEndDragging:(UIScrollView *)scrollView withVelocity:(CGPoint)velocity targetContentOffset:(inout CGPoint *)targetContentOffset {
    if ([oldDelegate respondsToSelector:@selector(scrollViewWillEndDragging::)]) {
        [oldDelegate scrollViewWillEndDragging:scrollView withVelocity:velocity targetContentOffset:targetContentOffset];
    }
}

- (void)scrollViewDidEndDragging:(UIScrollView *)scrollView willDecelerate:(BOOL)decelerate {
    if ([oldDelegate respondsToSelector:@selector(scrollViewDidEndDragging::)]) {
        [oldDelegate scrollViewDidEndDragging:scrollView willDecelerate:decelerate];
    }
}

- (void)scrollViewWillBeginDecelerating:(UIScrollView *)scrollView {
    if ([oldDelegate respondsToSelector:@selector(scrollViewWillBeginDecelerating:)]) {
        [oldDelegate scrollViewWillBeginDecelerating:scrollView];
    }
}

- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView {
    if ([oldDelegate respondsToSelector:@selector(scrollViewDidEndDecelerating:)]) {
        [oldDelegate scrollViewDidEndDecelerating:scrollView];
    }
}

- (void)scrollViewDidEndScrollingAnimation:(UIScrollView *)scrollView {
    if ([oldDelegate respondsToSelector:@selector(scrollViewDidEndScrollingAnimation:)]) {
        [oldDelegate scrollViewDidEndScrollingAnimation:scrollView];
    }
}

- (void)scrollViewWillBeginZooming:(UIScrollView *)scrollView withView:(UIView *)view {
    originalFrame = _imageContainer.frame;
    
    if ([oldDelegate respondsToSelector:@selector(scrollViewWillBeginZooming::)]) {
        [oldDelegate scrollViewWillBeginZooming:scrollView withView:view];
    }
}

- (void)scrollViewDidEndZooming:(UIScrollView *)scrollView withView:(UIView *)view atScale:(float)scale {
    float x = originalFrame.origin.x * scale;
    float y = originalFrame.origin.y * scale;
    float width = originalFrame.size.width * scale;
    float height = originalFrame.size.height * scale;
    _imageContainer.frame = CGRectMake(x, y, width, height);

    _originalScale *= scale;
    _imageContainer.transform = CGAffineTransformMakeScale(_originalScale, _originalScale);

    if ([oldDelegate respondsToSelector:@selector(scrollViewDidEndZooming::)]) {
        [oldDelegate scrollViewDidEndZooming:scrollView withView:view atScale:scale];
    }
}

- (BOOL)scrollViewShouldScrollToTop:(UIScrollView *)scrollView {
    if ([oldDelegate respondsToSelector:@selector(scrollViewShouldScrollToTop:)]) {
        return [oldDelegate scrollViewShouldScrollToTop:scrollView];
    }
    return false;
}

- (void)scrollViewDidScrollToTop:(UIScrollView *)scrollView {
    if ([oldDelegate respondsToSelector:@selector(scrollViewDidScrollToTop:)]) {
        [oldDelegate scrollViewDidScrollToTop:scrollView];
    }
}*/

// this happens while we are running ( in the background, or from within our own app )
// only valid if History.plist specifies a protocol to handle
- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url 
{
    // must call super so all plugins will get the notification, and their handlers will be called 
	// super also calls into javascript global function 'handleOpenURL'
    return [super application:application handleOpenURL:url];
}

-(id) getCommandInstance:(NSString*)className
{
	/** You can catch your own commands here, if you wanted to extend the gap: protocol, or add your
	 *  own app specific protocol to it. -jm
	 **/
	return [super getCommandInstance:className];
}

/**
 Called when the webview finishes loading.  This stops the activity view and closes the imageview
 */
- (void)webViewDidFinishLoad:(UIWebView *)theWebView 
{
	// only valid if History.plist specifies a protocol to handle
	if(self.invokeString)
	{
		// this is passed before the deviceready event is fired, so you can access it in js when you receive deviceready
		NSString* jsString = [NSString stringWithFormat:@"var invokeString = \"%@\";", self.invokeString];
		[theWebView stringByEvaluatingJavaScriptFromString:jsString];
	}
	
/*   	theWebView.backgroundColor = [UIColor clearColor];
    [theWebView setOpaque:NO];

    UIScrollView* phoneGapScrollView = (UIScrollView*)[theWebView.subviews objectAtIndex:0];
    
    [phoneGapScrollView insertSubview:_imageContainer atIndex:0];
    oldDelegate = theWebView;
    [oldDelegate retain];
    phoneGapScrollView.delegate = self;*/

	return [ super webViewDidFinishLoad:theWebView ];
}

- (void)webViewDidStartLoad:(UIWebView *)theWebView 
{
	return [ super webViewDidStartLoad:theWebView ];
}

/**
 * Fail Loading With Error
 * Error - If the webpage failed to load display an error with the reason.
 */
- (void)webView:(UIWebView *)theWebView didFailLoadWithError:(NSError *)error 
{
	return [ super webView:theWebView didFailLoadWithError:error ];
}

/**
 * Start Loading Request
 * This is where most of the magic happens... We take the request(s) and process the response.
 * From here we can redirect links and other protocols to different internal methods.
 */
- (BOOL)webView:(UIWebView *)theWebView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
	return [ super webView:theWebView shouldStartLoadWithRequest:request navigationType:navigationType ];
}


- (BOOL) execute:(InvokedUrlCommand*)command
{
	return [ super execute:command];
}

- (void)dealloc
{
//    [_imageContainer release];

	[ super dealloc ];
}

@end
