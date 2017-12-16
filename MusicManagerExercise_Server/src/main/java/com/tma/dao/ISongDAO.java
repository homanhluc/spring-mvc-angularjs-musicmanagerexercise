package com.tma.dao;
import java.util.List;

import com.tma.entity.Song;
public interface ISongDAO {
    List<Song> getAllSongs();
    Song getSongById(int id);
    void addSong(Song song);
    void updateSong(Song song);
    void deleteSong(int id);
  
}
 