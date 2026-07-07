import db from '../config/db.js';

export const findAbout = async () => {
    const [rows] = await db.execute('SELECT * FROM about_page WHERE id = 1');
    return rows[0] ?? null;
};

export const update = async (data) => {
    const currentAbout = await findAbout();
    if (!currentAbout) return false;

    const sql = `UPDATE about_page SET 
        header_line1 = ?, header_accent = ?, header_line2 = ?, 
        header_subtitle = ?, bio_title = ?, bio_text = ?, 
        philosophy_quote = ?, philosophy_author = ?, philosophy_prefix = ?, 
        philosophy_important = ?, philosophy_suffix = ?, philosophy_text = ?, 
        photo_url = ?, video_url = ?
        WHERE id = 1`;

    const params = [
        data.header_line1 ?? currentAbout.header_line1 ?? null,
        data.header_accent ?? currentAbout.header_accent ?? null,
        data.header_line2 ?? currentAbout.header_line2 ?? null,
        data.header_subtitle ?? currentAbout.header_subtitle ?? null,
        data.bio_title ?? currentAbout.bio_title ?? null,
        data.bio_text ?? currentAbout.bio_text ?? null,
        data.philosophy_quote ?? currentAbout.philosophy_quote ?? null,
        data.philosophy_author ?? currentAbout.philosophy_author ?? null,
        data.philosophy_prefix ?? currentAbout.philosophy_prefix ?? null,
        data.philosophy_important ?? currentAbout.philosophy_important ?? null,
        data.philosophy_suffix ?? currentAbout.philosophy_suffix ?? null,
        data.philosophy_text ?? currentAbout.philosophy_text ?? null,
        data.photo_url ?? currentAbout.photo_url ?? null,
        data.video_url ?? currentAbout.video_url ?? null
    ];

    const [result] = await db.execute(sql, params);
    return result.affectedRows > 0;
};

export const updatePhotoUrl = async (photoUrl) => {
    const [result] = await db.execute(
        'UPDATE about_page SET photo_url = ? WHERE id = 1', 
        [photoUrl]
    );
    return result.affectedRows > 0;
};

export const updateVideoUrl = async (videoUrl) => {
    const [result] = await db.execute(
        'UPDATE about_page SET video_url = ? WHERE id = 1', 
        [videoUrl]
    );
    return result.affectedRows > 0;
};