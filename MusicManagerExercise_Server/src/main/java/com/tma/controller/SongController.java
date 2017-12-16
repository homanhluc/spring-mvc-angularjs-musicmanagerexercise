package com.tma.controller;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.apache.tomcat.util.http.fileupload.FileUpload;
import org.apache.tomcat.util.http.fileupload.UploadContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.util.UriComponentsBuilder;

import com.tma.entity.Song;
import com.tma.service.ISongService;

@Controller
@RequestMapping("/music/song")
public class SongController {
	@Autowired
	private ISongService songService;

	//Get a song by id
	@RequestMapping(value="/{id}", method = RequestMethod.GET )
	public ResponseEntity<Song> getSongById(@PathVariable("id") Integer id) {
		Song song = songService.getSongById(id);
		return new ResponseEntity<Song>(song, HttpStatus.OK);
	}
	
	//get all songs
	@RequestMapping(value= "/", method = RequestMethod.GET)
	public ResponseEntity<List<Song>> getAllSongs() {
		List<Song> list = songService.getAllSongs();
		return new ResponseEntity<List<Song>>(list, HttpStatus.OK);
	}
	
	//add a song
	@RequestMapping(value= "/", method = RequestMethod.POST)
	public ResponseEntity<Void> addSong(@RequestBody Song song, UriComponentsBuilder builder){
		songService.addSong(song);
		
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/song/{id}").buildAndExpand(song.getId()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}
	
	//update a song
	@RequestMapping(value="/{id}", method = RequestMethod.PUT )
	public ResponseEntity<Song> updateSong(@RequestBody Song song) {
		songService.updateSong(song);
		return new ResponseEntity<Song>(song, HttpStatus.OK);
	}
	
	//delete a song
	@RequestMapping(value="/{id}", method = RequestMethod.DELETE )
	public ResponseEntity<Void> deleteSong(@PathVariable("id") Integer id) {
		songService.deleteSong(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}	
} 