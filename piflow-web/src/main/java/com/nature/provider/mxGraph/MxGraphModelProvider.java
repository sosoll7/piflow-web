package com.nature.provider.mxGraph;

import java.util.Date;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.jdbc.SQL;

import com.nature.base.util.DateUtils;
import com.nature.base.util.Utils;
import com.nature.component.mxGraph.model.MxGraphModel;

public class MxGraphModelProvider {

	public String addMxGraphModel(MxGraphModel mxGraphModel) {
		String sqlStr = "";
		if (null != mxGraphModel) {
			String id = mxGraphModel.getId();
			String crtUser = mxGraphModel.getCrtUser();
			Date crtDttm = mxGraphModel.getCrtDttm();
			Date lastUpdateDttm = mxGraphModel.getLastUpdateDttm();
			String lastUpdateUser = mxGraphModel.getLastUpdateUser();
			Boolean enableFlag = mxGraphModel.getEnableFlag();
			Long version = mxGraphModel.getVersion();
			String dx = mxGraphModel.getDx();
			String dy = mxGraphModel.getDy();
			String grid = mxGraphModel.getGrid();
			String gridSize = mxGraphModel.getGridSize();
			String guides = mxGraphModel.getGuides();
			String tooltips = mxGraphModel.getTooltips();
			String connect = mxGraphModel.getConnect();
			String arrows = mxGraphModel.getArrows();
			String fold = mxGraphModel.getFold();
			String page = mxGraphModel.getPage();
			String pageScale = mxGraphModel.getPageScale();
			String pageWidth = mxGraphModel.getPageWidth();
			String pageHeight = mxGraphModel.getPageHeight();
			String background = mxGraphModel.getBackground();
			SQL sql = new SQL();

			// INSERT_INTO括号中为数据库表名
			sql.INSERT_INTO("mx_graph_model");
			// value中的第一个字符串为数据库中表对应的字段名
			// 除数字类型的字段外其他类型必须加单引号
			if (StringUtils.isNotBlank(id)) {
				sql.VALUES("ID", Utils.addSqlStr(id));
			}
			if (null != crtDttm) {
				String crtDttmStr = DateUtils.dateTimesToStr(crtDttm);
				if (StringUtils.isNotBlank(crtDttmStr)) {
					sql.VALUES("CRT_DTTM", Utils.addSqlStr(crtDttmStr));
				}
			}
			if (StringUtils.isNotBlank(crtUser)) {
				sql.VALUES("CRT_USER", Utils.addSqlStr(crtUser));
			}
			if (null != enableFlag) {
				int enableFlagInt = enableFlag ? 1 : 0;
				sql.VALUES("ENABLE_FLAG", enableFlagInt + "");
			}
			if (null != lastUpdateDttm) {
				String lastUpdateDttmStr = DateUtils.dateTimesToStr(lastUpdateDttm);
				if (StringUtils.isNotBlank(lastUpdateDttmStr)) {
					sql.VALUES("LAST_UPDATE_DTTM", Utils.addSqlStr(lastUpdateDttmStr));
				}
			}
			if (StringUtils.isNotBlank(lastUpdateUser)) {
				sql.VALUES("LAST_UPDATE_USER", Utils.addSqlStr(lastUpdateUser));
			}
			if (null != version && StringUtils.isNotBlank(version.toString())) {
				sql.VALUES("VERSION", version.toString());
			}
			if (StringUtils.isNotBlank(dx)) {
				sql.VALUES("MX_DX", Utils.addSqlStr(dx));
			}
			if (StringUtils.isNotBlank(dy)) {
				sql.VALUES("MX_DY", Utils.addSqlStr(dy));
			}
			if (StringUtils.isNotBlank(grid)) {
				sql.VALUES("MX_GRID", Utils.addSqlStr(grid));
			}
			if (StringUtils.isNotBlank(gridSize)) {
				sql.VALUES("MX_GRIDSIZE", Utils.addSqlStr(gridSize));
			}
			if (StringUtils.isNotBlank(guides)) {
				sql.VALUES("MX_GUIDES", Utils.addSqlStr(guides));
			}
			if (StringUtils.isNotBlank(tooltips)) {
				sql.VALUES("MX_TOOLTIPS", Utils.addSqlStr(tooltips));
			}
			if (StringUtils.isNotBlank(connect)) {
				sql.VALUES("MX_CONNECT", Utils.addSqlStr(connect));
			}
			if (StringUtils.isNotBlank(arrows)) {
				sql.VALUES("MX_ARROWS", Utils.addSqlStr(arrows));
			}
			if (StringUtils.isNotBlank(fold)) {
				sql.VALUES("MX_FOLD", Utils.addSqlStr(fold));
			}
			if (StringUtils.isNotBlank(page)) {
				sql.VALUES("MX_PAGE", Utils.addSqlStr(page));
			}
			if (StringUtils.isNotBlank(pageScale)) {
				sql.VALUES("MX_PAGESCALE", Utils.addSqlStr(pageScale));
			}
			if (StringUtils.isNotBlank(pageWidth)) {
				sql.VALUES("MX_PAGEWIDTH", Utils.addSqlStr(pageWidth));
			}
			if (StringUtils.isNotBlank(pageHeight)) {
				sql.VALUES("MX_PAGEHEIGHT", Utils.addSqlStr(pageHeight));
			}
			if (StringUtils.isNotBlank(background)) {
				sql.VALUES("MX_BACKGROUND", Utils.addSqlStr(background));
			}

			sqlStr = sql.toString() + ";";
		}
		return sqlStr;
	}

	public String updateMxGraphModel(MxGraphModel mxGraphModel) {
		String sqlStr = "";
		if (null != mxGraphModel) {
			String id = mxGraphModel.getId();
			if (StringUtils.isNotBlank(id)) {
				Date lastUpdateDttm = mxGraphModel.getLastUpdateDttm();
				String lastUpdateUser = mxGraphModel.getLastUpdateUser();
				Boolean enableFlag = mxGraphModel.getEnableFlag();
				Long version = mxGraphModel.getVersion();
				String dx = mxGraphModel.getDx();
				String dy = mxGraphModel.getDy();
				String grid = mxGraphModel.getGrid();
				String gridSize = mxGraphModel.getGridSize();
				String guides = mxGraphModel.getGuides();
				String tooltips = mxGraphModel.getTooltips();
				String connect = mxGraphModel.getConnect();
				String arrows = mxGraphModel.getArrows();
				String fold = mxGraphModel.getFold();
				String page = mxGraphModel.getPage();
				String pageScale = mxGraphModel.getPageScale();
				String pageWidth = mxGraphModel.getPageWidth();
				String pageHeight = mxGraphModel.getPageHeight();
				String background = mxGraphModel.getBackground();
				SQL sql = new SQL();

				// INSERT_INTO括号中为数据库表名
				sql.UPDATE("mx_graph_model");
				// set中的第一个字符串为数据库中表对应的字段名
				// 除数字类型的字段外其他类型必须加单引号
				if (null != enableFlag) {
					int enableFlagInt = enableFlag ? 1 : 0;
					sql.SET("ENABLE_FLAG = " + enableFlagInt);
				}
				if (null != lastUpdateDttm) {
					String lastUpdateDttmStr = DateUtils.dateTimesToStr(lastUpdateDttm);
					if (StringUtils.isNotBlank(lastUpdateDttmStr)) {
						sql.SET("LAST_UPDATE_DTTM = " + Utils.addSqlStr(lastUpdateDttmStr));
					}
				}
				if (StringUtils.isNotBlank(lastUpdateUser)) {
					sql.SET("LAST_UPDATE_USER = " + Utils.addSqlStr(lastUpdateUser));
				}
				if (null != version && StringUtils.isNotBlank(version.toString())) {
					sql.SET("VERSION = " + version.toString());
				}
				if (StringUtils.isNotBlank(dx)) {
					sql.SET("MX_DX = " + Utils.addSqlStr(dx));
				}
				if (StringUtils.isNotBlank(dy)) {
					sql.SET("MX_DY = " + Utils.addSqlStr(dy));
				}
				if (StringUtils.isNotBlank(grid)) {
					sql.SET("MX_GRID = " + Utils.addSqlStr(grid));
				}
				if (StringUtils.isNotBlank(gridSize)) {
					sql.SET("MX_GRIDSIZE = " + Utils.addSqlStr(gridSize));
				}
				if (StringUtils.isNotBlank(guides)) {
					sql.SET("MX_GUIDES = " + Utils.addSqlStr(guides));
				}
				if (StringUtils.isNotBlank(tooltips)) {
					sql.SET("MX_TOOLTIPS = " + Utils.addSqlStr(tooltips));
				}
				if (StringUtils.isNotBlank(connect)) {
					sql.SET("MX_CONNECT = " + Utils.addSqlStr(connect));
				}
				if (StringUtils.isNotBlank(arrows)) {
					sql.SET("MX_ARROWS = " + Utils.addSqlStr(arrows));
				}
				if (StringUtils.isNotBlank(fold)) {
					sql.SET("MX_FOLD = " + Utils.addSqlStr(fold));
				}
				if (StringUtils.isNotBlank(page)) {
					sql.SET("MX_PAGE = " + Utils.addSqlStr(page));
				}
				if (StringUtils.isNotBlank(pageScale)) {
					sql.SET("MX_PAGESCALE = " + Utils.addSqlStr(pageScale));
				}
				if (StringUtils.isNotBlank(pageWidth)) {
					sql.SET("MX_PAGEWIDTH = " + Utils.addSqlStr(pageWidth));
				}
				if (StringUtils.isNotBlank(pageHeight)) {
					sql.SET("MX_PAGEHEIGHT = " + Utils.addSqlStr(pageHeight));
				}
				if (StringUtils.isNotBlank(background)) {
					sql.SET("MX_BACKGROUND = " + Utils.addSqlStr(background));
				}
				sql.WHERE("id = " + Utils.addSqlStr(id));
				sqlStr = sql.toString() + ";";
				if (StringUtils.isBlank(id)) {
					sqlStr = "";
				}
			}
		}
		return sqlStr;
	}

	public String getMxGraphModelById(String id) {
		String sqlStr = "select * from mx_graph_model where id = #{id}";
		if (StringUtils.isNotBlank(id)) {
			SQL sql = new SQL();
			sql.SELECT("*");
			sql.FROM("mx_graph_model");
			sql.WHERE("id = " + Utils.addSqlStr(id));
			sql.WHERE("enable_flag = 1");
			sqlStr = sql.toString() + ";";
		}
		return sqlStr;
	}

}
