package com.tma.dao;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate4.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.tma.entity.Song;
@Transactional
@Repository
public class SongDAO implements ISongDAO {
	@Autowired
	private HibernateTemplate  hibernateTemplate;
	@Override
	public Song getSongById(int id) {
		return hibernateTemplate.get(Song.class, id);
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<Song> getAllSongs() {
		String hql = "FROM Song as p ORDER BY p.id";
		return (List<Song>) hibernateTemplate.find(hql);
	}
	@Override
	public void addSong(Song song) {
		hibernateTemplate.save(song);
	}
	@Override
	public void updateSong(Song song) {
		Song p = getSongById(song.getId());
		p.setName(song.getName());
		p.setGenre(song.getGenre());
		p.setFile(song.getFile());
		hibernateTemplate.update(p);
	}
	@Override
	public void deleteSong(int id) {
		hibernateTemplate.delete(getSongById(id));
	}
}
