var TOC = {
    load: function () {
        TOC.addIcons();
        TOC.loadT2();
        TOC.checkIfIndex();
        $('#toc_button').click(TOC.toggle);
        $('.toggle-toctree-l1').children('a').click(function() {
            TOC.toggleT2($(this).parent('li'));
        });
    },
    toggle: function () {
        if ($('#sphinxsidebar').toggle().is(':hidden')) {
            $('div.document').css('left', "0px");
            $('#header').css('left', "0px");
            $('toc_button').removeClass("open");
        } else {
            $('div.document').css('left', "230px");
            $('#header').css('left', "230px");
            $('#toc_button').addClass("open");
        }
        return $('#sphinxsidebar');
    },
    addIcons: function() {
        $('#sphinxsidebar').find('li.toctree-l1').each(function(){
            var thisName = $(this).children('a').text();
            var icons = {
                'quickstart' : 'crtr-icon icon-get-started',
                'apple' : 'crtr-icon icon-ios',
                'android' : 'crtr-icon icon-android',
                'html5' : 'crtr-icon icon-html5',
                'api' : 'crtr-icon icon-api',
                'downloads' : 'crtr-icon icon-downloads',
                'eula' : 'crtr-icon icon-docs',
                'notes' : 'crtr-icon icon-notes',
                'integration' : 'crtr-icon icon-integrations',
                'docs' : 'crtr-icon icon-docs',
                'overview' : 'crtr-icon icon-info',
                'app wrapping' : 'crtr-icon icon-app-wrapping',
                'development platforms' : 'crtr-icon icon-development-platforms',
                'checksums' : 'crtr-icon icon-notes',
                'japanese' : 'crtr-icon icon-hiragana'
            }
            var iconKey = '';
            $.each(icons, function(k,v){
                var re = new RegExp(k,'i');
                var iconMatch = thisName.match(re);
                if (iconMatch) {
                    iconKey = iconMatch[0].toLowerCase();
                }
            });
            if (iconKey.length > 0) {
                var icon = icons[iconKey];
                $(this).children('a').prepend('<span class="'+icon+'"></span> ');
            } else {
                $(this).children('a').prepend('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
            }
        });
    },
    loadT2: function() {
        $('#sphinxsidebar').find('li.toctree-l1').each(function(){
            var $thisUl = $(this).children('ul');
            if ($thisUl.children().length > 0) {
                $(this).addClass('toggle-toctree-l1 open');
            }
        });
    },
    toggleT2: function($this) {
        event.preventDefault();
        var $thisList = $this.children('ul');
        if ($thisList.is(':hidden')) {
            $thisList.fadeIn();
            $this.removeClass('closed').addClass('open');
        } else {
            $thisList.fadeOut();
            $this.removeClass('open').addClass('closed');
        }
    },
    checkIfIndex: function(){
        var thisUrl = window.location.pathname;
        if (thisUrl.match('index.html') || thisUrl == '/') {
            $('li#docs-home').addClass('current');
        }
    }
};
var LandingGrid = {
    load: function(){
        var minHeight = 0;
        $('.landing-grid-box').each(function(){
            var $this = $(this);
            if ($this.height() > minHeight){
                minHeight = $this.height();
            }
        }).each(function(){
            var $this = $(this);
            $(this).height(minHeight);
            var thisHeight = $this.height();
            var $leftChild = $this.children('.float-icon');
            var $rightChild = $this.children('.float-content');
            var leftHeight = $leftChild.height();
            var rightHeight = $rightChild.height();
            var leftMarginTop = (thisHeight - leftHeight)/2;
            var rightMarginTop = (thisHeight - rightHeight)/2;
            $rightChild.css('marginTop',rightMarginTop);
            $leftChild.css('marginTop',leftMarginTop);
       }).each(function(){
            $(this).animate({opacity:1},500);
       });

    }
}

$(document).ready(function () {
    TOC.load();
    LandingGrid.load();
});
