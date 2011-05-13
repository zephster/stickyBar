/*
* jQuery stickyBar Plugin
* Copyright (c) 2010 Brandon S. <antizeph@gmail.com>
* Version: 1.1.2 (09/14/2010)
* http://plugins.jquery.com/project/stickyBar
* 
* Start: define a .sticky class in your css file, and style it however you want.
* Usage (simple):      $.stickyBar(div);
* Usage (advanced):    $.stickyBar(divTarget, {'showClose' : true, 'divBase' : divBase});
* 
* Notes:    divTarget is the div you want to be stickied (and by default is also divBase).
*           divBase is the target to scroll past to invoke stickyBar.
*           showClose displays a small 'x' that closes stickyBar

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

(function($){
    $.fn.stickyBar = function(o){
        $.stickyBar(o);
    }

    $.stickyBar = function(divTarget, options){
        var defaults = {
            'divBase'   : '',
            'showClose' : false
        };
        settings = $.extend(defaults, options);

        var wrapped = 0;

        divTargetBase = (settings.divBase) ? divTargetBase = settings.divBase : divTargetBase = divTarget;

        var stickyBarTop = $(divTargetBase).offset().top;
        $(window).scroll(function(){
            var scrollPos = $(window).scrollTop();

            if (scrollPos > stickyBarTop){
                if (wrapped == 0){                
                    $(divTarget).wrap('<div class="sticky">');
                    $(".sticky").css({'position':"fixed",'top':"0",'left':"0",'width':"100%",'z-index':"999"});
                    wrapped = 1;

                    if (settings.showClose){
                        $(".sticky").append('<div class="stickyClose" style="left:95%;position:absolute;color:#fff;top:0;left:98%;cursor:pointer">x</div>');
                        $(".stickyClose").click(function(){
                            $(".sticky").slideUp();
                            setTimeout(function(){
                                $(divTarget).unwrap();
                                $(".stickyClose").remove();
                            },400);
                            wrapped = 2; //won't happen again on the page until a refresh. re-think this approach. maybe a minimize instead?
                        });
                    }
                }
            } else {
                if (wrapped === 1){
                    $(divTarget).unwrap();
                    wrapped = 0;
                }
            }
        });
    };
}) (jQuery);
