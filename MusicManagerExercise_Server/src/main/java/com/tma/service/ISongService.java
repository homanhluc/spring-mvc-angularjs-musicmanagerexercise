package com.tma.service;

import java.util.List;

import com.tma.entity.Song;

public interface ISongService {
	
     List<Song> getAllSongs();
     Song getSongById(int pid);
     void addSong(Song person);
     void updateSong(Song person);
     void deleteSong(int pid);
     
}
