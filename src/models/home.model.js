import db from '../config/db.js';

export const findHome = async () => {
    const [rows] = await db.execute('SELECT * FROM home_page WHERE id = 1');
    return rows[0] ?? null;
};

export const update = async (data) => {
    const current = await findHome();
    if (!current) return false;

    const sql = `UPDATE home_page SET 
        label = ?, title_line1 = ?, title_line2 = ?, paragraph = ?,
        cta1_label = ?, cta1_url = ?, cta2_label = ?, cta2_url = ?
        WHERE id = 1`;

    const params = [
        data.label ?? current.label ?? null,
        data.title_line1 ?? current.title_line1 ?? null,
        data.title_line2 ?? current.title_line2 ?? null,
        data.paragraph ?? current.paragraph ?? null,
        data.cta1_label ?? current.cta1_label ?? null,
        data.cta1_url ?? current.cta1_url ?? null,
        data.cta2_label ?? current.cta2_label ?? null,
        data.cta2_url ?? current.cta2_url ?? null,
    ];

    const [result] = await db.execute(sql, params);
    return result.affectedRows > 0;
};

export const updateVideoUrl = async (videoUrl) => {
    const [result] = await db.execute(
        'UPDATE home_page SET video_url = ? WHERE id = 1',
        [videoUrl]
    );
    return result.affectedRows > 0;
};

export const updatePosterUrl = async (posterUrl) => {
    const [result] = await db.execute(
        'UPDATE home_page SET poster_url = ? WHERE id = 1',
        [posterUrl]
    );
    return result.affectedRows > 0;
};