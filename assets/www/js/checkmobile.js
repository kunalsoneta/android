/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var apps = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();

    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {

		 document.addEventListener('deviceready', this.onDeviceReady, false);
		 document.addEventListener("online",  this.onOnline, false);
         document.addEventListener("offline",  this.onOffline, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

         document.addEventListener("backbutton", function(e){
         var pagename = localStorage.getItem('offlineurl');

                if(pagename == "dashboard.html" || pagename == "dashboard.html#" || pagename == "login.html" || pagename == "login.html#" || pagename == "login_home.html" || pagename == "login_home.html#")
                 {
                 navigator.app.exitApp();
                 }
                 else
                 {
                    if(pagename == "success.html" || pagename == "success.html#")
                    {
                         localStorage.setItem('addtocartlistlocal',"");
                         window.location = "dashboard.html";
                    }
                    else
                    {
                       navigator.app.backHistory()
                    }
                 }

            }, false);

    },
    // Update DOM on a Received Event
     receivedEvent: function(id) {

    },
	onOnline: function() {

    },
	onOffline: function() {
                var href = document.location.href;
               	var lastPathSegment = href.substr(href.lastIndexOf('/') + 1);
           	    localStorage.setItem('offlineurl',lastPathSegment);
           		window.location = "nonetwork.html"

    },

};


