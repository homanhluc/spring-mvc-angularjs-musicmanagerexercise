package com.tma.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tma.dao.ISongDAO;
import com.tma.entity.Song;
@Service
public class SongService implements ISongService {
	@Autowired
	private ISongDAO songDAO;
	@Override
	public Song getSongById(int id) {
		Song obj = songDAO.getSongById(id);
		return obj;
	}	
	@Override
	public List<Song> getAllSongs(){
		return songDAO.getAllSongs();
	}
	@Override
	public void addSong(Song song){
    	   songDAO.addSong(song);
	}
	@Override
	public void updateSong(Song song) {
		songDAO.updateSong(song);
	}
	@Override
	public void deleteSong(int id) {
		songDAO.deleteSong(id);
	}
}
