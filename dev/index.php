<?php include 'header.php'; ?>
<?php include 'menu.php'; ?>
<div id="fullpage">
	<div class="section " id="section0">
    <div class="content">
      <div class="imageStartFullscreenWrapper">
        <!--<div class="videoStartFullscreen" id="startVideoTeaser">-->

        <!--http://stackoverflow.com/questions/17585208/how-to-initially-mute-videos-->
        <video id="example_video_1" class="video-js vjs-default-skin vjs-big-play-centered"
            controls muted preload="auto" width="640" height="264"
            poster="http://video-js.zencoder.com/oceans-clip.png"
                 data-setup='{
        "controls": false,
        "loop": "true",
        "autoplay": true, 
        "preload": "true"}'>
           <source src="video/_chip1.mp4" type='video/mp4' />

           <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
        </video>

          <!--<iframe src="https://player.vimeo.com/video/109249906?color=ffffff&title=0&byline=0&portrait=0" width="320" height="180" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>-->
        <!--</div>-->
        <div class="fullscreenHeadlineBox" id="headlineBoxNumber01">
          <div>
            <a href="#" class="linkFullscreen">1 Diamond-League Weltklasse Leichtathletik Closing-Ceremony, Stadionshow</a>
          </div> 
            <div class="headlineBoxArrowDown">
              <img src="images/arrow_down.png" alt="">
            </div> 
        </div>
      </div>
    </div>
	</div>

	<div class="section" id="section1">
		<div class="content">
			<div class="imageStartFullscreenWrapper">
				<div class="focuspoint imageStartFullscreen" data-focus-x="0" data-focus-y="0">
					<img src="images/fullscreenStart.jpg" alt="">
				</div>
        <div class="fullscreenHeadlineBox" id="headlineBoxNumber02">
          <div>
            <a href="#" class="linkFullscreen">2 Diamond-League Weltklasse Leichtathletik Closing-Ceremony, Stadionshow</a>
          </div> 
            <div class="headlineBoxArrowDown">
              <img src="images/arrow_down.png" alt="">
            </div> 
        </div>
		</div>
	</div>
</div>

  <div class="section" id="section2">
    <div class="content">
      <div class="imageStartFullscreenWrapper">
        <div class="focuspoint imageStartFullscreen" data-focus-x="0" data-focus-y="0">
          <img src="images/fullscreenStart.jpg" alt="">
        </div>
        <div class="fullscreenHeadlineBox" id="headlineBoxNumber03">
          <div>
            <a href="#" class="linkFullscreen">3 Diamond-League Weltklasse Leichtathletik Closing-Ceremony, Stadionshow</a>
          </div> 
        </div>
    </div>
  </div>
</div>
</div><!--END WRAPPER CONTAINER-->

<?php include 'footer.php'; ?>


